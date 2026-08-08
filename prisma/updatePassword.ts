// updatePasswords.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    const users = await prisma.users.findMany();

    for (const user of users) {
        // skip kalau password udah ke-hash (opsional, cek panjang/awalan hash bcrypt "$2b$")
        if (user.password.startsWith("$2b$")) continue;

        const hashed = await bcrypt.hash(user.password, 10);
        await prisma.users.update({
        where: { id: user.id },
        data: { password: hashed },
        });
        console.log(`Updated password for user ${user.email}`);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());