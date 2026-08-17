# FINTRACK-API

## SETUP
### 1. Clone & Install
```bash
git clone https://github.com/Revou-FSSE-Feb26/milestone-4-MicelHiu.git
cd milestone-4-MicelHiu
npm install
```
### 2. Environment Variables
.env.example
```bash
DATABASE_URL="postgresql://postgres.vanvnwbnhpcyotzvcxsp:<your password>@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
JWT_SECRET="F1ntrack_ap1"

copy ".env.example" to ".env" file
```bash
cp .env.example .env
```
### 3. Database Migration
```bash
npx prisma migrate dev
npx prisma generate
npx prisma studio
```
### 4. Run the application
```bash
# development
npm run start:dev

#production
npm run build
npm run start
```
---
## ERD
![ERD](docs/ERD.png)
---
## ARCHITECTURE OVERVIEW

## KNOWN LIMITATIONS

## TECH STACK
- Framework: Nest.js, Prisma
- Database: PostgreSQL
- Deployments: Railway, Supabase, Postman
- Link: milestone-4-micelhiu-production.up.railway.app
- Link API: https://documenter.getpostman.com/view/56609845/2sBY4VLJ7Z 