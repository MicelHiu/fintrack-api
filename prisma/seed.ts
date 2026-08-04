import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ 
    adapter,
});

async function main() {
  console.log("🌱 Start seeding...");

  /* Users */
  await prisma.users.createMany({
    data: [
      {
        name: "Michelle Hiu",
        email: "michelle@example.com",
        password: "password123",
        role: "user",
      },
      {
        name: "Andi Pratama",
        email: "andi@example.com",
        password: "password123",
        role: "user",
      },
      {
        name: "Cindy Wijaya",
        email: "cindy@example.com",
        password: "password123",
        role: "admin",
      },
    ],
  });

  /* Accounts */
  await prisma.accounts.createMany({
    data: [
      { user_id: 1, name: "Cash Wallet", type: "cash", balance: 1250.0 },
      { user_id: 1, name: "BCA Bank", type: "bank", balance: 5500.0 },

      { user_id: 2, name: "Cash Wallet", type: "cash", balance: 700.0 },
      { user_id: 2, name: "Mandiri Bank", type: "bank", balance: 3200.0 },

      { user_id: 3, name: "Cash Wallet", type: "cash", balance: 500.0 },
      { user_id: 3, name: "GoPay", type: "e_wallet", balance: 1800.0 },
    ],
  });

  /* Categories */
  await prisma.categories.createMany({
    data: [
      { name: "Salary", type: "income" },
      { name: "Freelance", type: "income" },
      { name: "Food & Beverage", type: "expense" },
      { name: "Transportation", type: "expense" },
      { name: "Shopping", type: "expense" },
      { name: "Entertainment", type: "expense" },
      { name: "Healthcare", type: "expense" },
    ],
  });

  /* Transactions */
  await prisma.transactions.createMany({
    data: [
      // Michelle
      {
        account_id: 2,
        category_id: 1,
        type: "income",
        amount: 5000,
        description: "Monthly Salary",
        transaction_date: new Date("2026-07-01"),
      },
      {
        account_id: 2,
        category_id: 2,
        type: "income",
        amount: 800,
        description: "Website Project",
        transaction_date: new Date("2026-07-05"),
      },
      {
        account_id: 2,
        category_id: 3,
        type: "expense",
        amount: 120,
        description: "Lunch",
        transaction_date: new Date("2026-07-06"),
      },
      {
        account_id: 2,
        category_id: 4,
        type: "expense",
        amount: 40,
        description: "Taxi",
        transaction_date: new Date("2026-07-08"),
      },
      {
        account_id: 1,
        category_id: 5,
        type: "expense",
        amount: 250,
        description: "New Headset",
        transaction_date: new Date("2026-07-10"),
      },
      {
        account_id: 1,
        category_id: 6,
        type: "expense",
        amount: 75,
        description: "Cinema",
        transaction_date: new Date("2026-07-12"),
      },
      {
        account_id: 2,
        category_id: 3,
        type: "expense",
        amount: 65,
        description: "Dinner",
        transaction_date: new Date("2026-07-15"),
      },

      // Andi
      {
        account_id: 4,
        category_id: 1,
        type: "income",
        amount: 3200,
        description: "Monthly Salary",
        transaction_date: new Date("2026-07-01"),
      },
      {
        account_id: 3,
        category_id: 3,
        type: "expense",
        amount: 80,
        description: "Breakfast",
        transaction_date: new Date("2026-07-03"),
      },
      {
        account_id: 4,
        category_id: 4,
        type: "expense",
        amount: 30,
        description: "Bus Ticket",
        transaction_date: new Date("2026-07-05"),
      },
      {
        account_id: 4,
        category_id: 5,
        type: "expense",
        amount: 200,
        description: "Shoes",
        transaction_date: new Date("2026-07-09"),
      },
      {
        account_id: 3,
        category_id: 6,
        type: "expense",
        amount: 50,
        description: "Game Top Up",
        transaction_date: new Date("2026-07-12"),
      },
      {
        account_id: 4,
        category_id: 2,
        type: "income",
        amount: 450,
        description: "Logo Design",
        transaction_date: new Date("2026-07-17"),
      },
      {
        account_id: 4,
        category_id: 3,
        type: "expense",
        amount: 90,
        description: "Restaurant",
        transaction_date: new Date("2026-07-18"),
      },

      // Cindy
      {
        account_id: 6,
        category_id: 1,
        type: "income",
        amount: 6000,
        description: "Monthly Salary",
        transaction_date: new Date("2026-07-01"),
      },
      {
        account_id: 6,
        category_id: 2,
        type: "income",
        amount: 1200,
        description: "Consulting",
        transaction_date: new Date("2026-07-04"),
      },
      {
        account_id: 5,
        category_id: 3,
        type: "expense",
        amount: 60,
        description: "Coffee",
        transaction_date: new Date("2026-07-05"),
      },
      {
        account_id: 6,
        category_id: 4,
        type: "expense",
        amount: 25,
        description: "Train Ticket",
        transaction_date: new Date("2026-07-07"),
      },
      {
        account_id: 6,
        category_id: 5,
        type: "expense",
        amount: 350,
        description: "Shopping Mall",
        transaction_date: new Date("2026-07-11"),
      },
      {
        account_id: 5,
        category_id: 6,
        type: "expense",
        amount: 90,
        description: "Netflix Subscription",
        transaction_date: new Date("2026-07-13"),
      },
      {
        account_id: 6,
        category_id: 3,
        type: "expense",
        amount: 110,
        description: "Dinner",
        transaction_date: new Date("2026-07-16"),
      },
      {
        account_id: 5,
        category_id: 4,
        type: "expense",
        amount: 20,
        description: "Parking Fee",
        transaction_date: new Date("2026-07-18"),
      },
    ],
  });

/*  Budgets
  await prisma.budgets.createMany({
    data: [
      {
        user_id: 1,
        category_id: 3,
        month: new Date("2026-07-01"),
        limit_amount: 500,
      },
      {
        user_id: 1,
        category_id: 5,
        month: new Date("2026-07-01"),
        limit_amount: 800,
      },
      {
        user_id: 2,
        category_id: 3,
        month: new Date("2026-07-01"),
        limit_amount: 400,
      },
      {
        user_id: 2,
        category_id: 6,
        month: new Date("2026-07-01"),
        limit_amount: 300,
      },
      {
        user_id: 3,
        category_id: 3,
        month: new Date("2026-07-01"),
        limit_amount: 700,
      },
      {
        user_id: 3,
        category_id: 5,
        month: new Date("2026-07-01"),
        limit_amount: 1000,
      },
    ],
  }); */

  console.log("✅ Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });