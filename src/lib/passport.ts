import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import {
  GoogleCallbackParameters,
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import db, { Account, User } from "../modules/db";
import { compare } from "bcrypt";
import { Request } from "express";

type JwtPayload = {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
};

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

// JWT Strategy
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload: JwtPayload, done) => {
    try {
      const user = await db.user.findUnique({ where: { id: jwtPayload.id } });
      if (
        user &&
        user.email === jwtPayload.email &&
        user.role === jwtPayload.role
      ) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: true, // Ensure this is true
    },
    async (
      req: Request, // Request object
      accessToken: string, // OAuth2 access token
      refreshToken: string, // OAuth2 refresh token
      params: GoogleCallbackParameters, // Google's callback parameters (id_token, expiry, etc.)
      profile: Profile, // Profile object with user data
      done: VerifyCallback, // Callback to indicate success/failure
    ) => {
      try {
        // Handle user creation or retrieval
        const user = await db.user.upsert({
          where: { email: profile.emails?.[0].value },
          create: {
            name: profile.displayName,
            email: profile.emails?.[0].value!,
            image: profile.photos?.[0].value,
            accounts: {
              create: {
                provider: "google",
                type: "oauth",
                providerAccountId: profile.id,
                access_token: accessToken,
                refresh_token: refreshToken,
              },
            },
          },
          update: {
            name: profile.displayName,
            image: profile.photos?.[0].value,
            accounts: {
              update: {
                where: {
                  provider_providerAccountId: {
                    provider: "google",
                    providerAccountId: profile.id,
                  },
                },
                data: {
                  access_token: accessToken,
                  refresh_token: refreshToken,
                },
              },
            },
          },
        });

        return done(null, user); // Successfully pass the user to Passport
      } catch (error) {
        console.error("Error in Google authentication:", error);
        return done(error, false); // Signal failure to Passport
      }
    },
  ),
);

// Local Strategy for Email/Password
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (
      email: string,
      password: string,
      done: (
        error: any,
        user?: Express.User | false,
        info?: { message: string },
      ) => void,
    ) => {
      try {
        const user = await db.user.findUnique({
          where: { email },
          include: { accounts: true },
        });

        if (
          !user ||
          !user.accounts.some((acc: Account) => acc.type === "credentials")
        ) {
          return done(null, false, { message: "Invalid email or password" });
        }

        const credentialsAccount = user.accounts.find(
          (acc: Account) => acc.type === "credentials",
        );

        const isValidPassword = await compare(
          password,
          credentialsAccount?.access_token || "",
        );

        if (!isValidPassword) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

// JWT authentication in Apollo context
export const authenticateJwt = (req: any): Promise<User | null> =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: Error | null, user: User | false | null) => {
        if (err) return reject(err);
        if (!user) return resolve(null);
        resolve(user);
      },
    )(req);
  });

// Local authentication for email/password
export const authenticateLocal = (
  email: string,
  password: string,
): Promise<User | null> =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      "Local",
      { session: false },
      (err: Error | null, user: User | false | null) => {
        if (err) return reject(err);
        if (!user) return resolve(null);
        resolve(user);
      },
    )({ body: { email, password } });
  });

export default passport;
