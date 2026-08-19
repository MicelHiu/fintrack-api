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
### Layered structure
Setiap domain (accounts, transactions, categories, users, auth) mengikuti pola 3 layer NestJS yang sama:
Controller  → menerima HTTP request, validasi DTO, delegasi ke Service
Service     → business logic (cek kepemilikan resource, hitung balance, dsb)
Repository  → satu-satunya layer yang bicara ke Prisma / database

Controller tidak memanggil Prisma langsung. Pemanggilan dilakukan melalui Service → Repository. Hal ini membuat logic query mudah diperbaiki tanpa menyentuh HTTP layer.

### Modules
| Module | Tanggung jawab |
|---|---|
| AuthModule | register/login, JWT issuing, menyimpan JwtAuthGuard & RolesGuard supaya bisa diexport ke module lain |
| UsersModule | CRUD data user |
| AccountsModule | rekening milik user, validasi kepemilikan (user_id harus match token) |
| TransactionsModule | CRUD transaksi + BalanceCalculatorService untuk hitung saldo berjalan |
| CategoriesModule | master data kategori transaksi |
| PrismaModule | wrap PrismaService, di-import di semua module yang butuh akses DB |

### Request pipeline
Request
  → LoggerMiddleware (global, semua route — app.module.ts)
  → ThrottlerGuard (global, via APP_GUARD di auth.module.ts — rate limiting)
  → JwtAuthGuard (per-controller/route — verifikasi Bearer token, isi req.user)
  → RolesGuard (route tertentu — cek req.user.role vs @Roles() metadata)
  → Controller → Service → Repository → Prisma → PostgreSQL (Supabase)

### Auth
- JwtAuthGuard membaca header Authorization: Bearer <token>, verify menggunakan JwtService, lalu inject payload ke req.user (dipakai lewat @CurrentUser() decorator).
- Role-based access pakai @Roles('admin') (metadata) + RolesGuard (pembaca metadata via Reflector).

### Database
- Schema didefinisikan di prisma/schema.prisma, akses lewat PrismaService (wrapper PrismaClient) yang di-inject ke tiap *.repository.ts.
- Relasi utama: users 1—N accounts 1—N transactions N—1 categories.

## KNOWN LIMITATIONS
- **Tidak ada pagination.** GET /accounts, GET /transactions, GET /categories mengembalikan seluruh baris (findMany() tanpa take/skip) — akan jadi masalah begitu data bertambah.

## TECH STACK
- Framework: Nest.js, Prisma
- Database: PostgreSQL
- Deployments: Railway, Supabase, Postman
- Link Production: [railway production](fintrack-api-production-307f.up.railway.app) 
- Link API: [postman collection](https://documenter.getpostman.com/view/56609845/2sBY4VLJ7Z) 