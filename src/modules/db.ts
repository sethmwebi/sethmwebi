import { PrismaClient } from "@prisma/client";

export { User, Account, Role } from "@prisma/client";

const db = new PrismaClient({ log: ["error", "info", "query", "warn"] });

export default db;
