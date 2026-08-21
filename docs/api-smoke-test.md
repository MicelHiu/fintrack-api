# API Smoke Test — FinTrack API

| | |
|---|---|
| Tanggal | 2026-08-20 09:37 WIB |
| Environment | local |
| base_url | http://localhost:3000 |
| Commit | 3551bb6 |
| Dijalankan oleh | Michelle |

Seluruh endpoint kecuali /auth/register dan /auth/login butuh header Authorization: Bearer <TOKEN>.
Ganti <TOKEN> dengan access_token dari hasil login. Endpoint bertanda (admin) butuh token dengan role admin.

---
## Auth
### POST /auth/login
```bash
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "cindy@example.com",
    "password": "password123"
}'
```
Response 200 - token issued:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzg2MzU1MDA1LCJleHAiOjE3ODYzNTg2MDV9.tpEAG4X9seLqfTXTgRlaymsvfZ5gTYCbaevgh4xCkCY"
}
```
Response 401 - invalid credentials, ketika email/password yang diinput tidak terdaftar atau salah password/email :
```json
{
    "message": "Invalid credentials",
    "error": "Unauthorized",
    "statusCode": 401
}
```
Response 429 - too many request, ketika dilakukan spam login 5x berturut-turut:
```json
{
    "statusCode": 429,
    "message": "ThrottlerException: Too Many Requests"
}
```
### POST /auth/register
```bash
curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Micel",
    "email": "micel@gmail.com",
    "password": "micel123",
    "role": "user"
}'
```
Response 201 - registered:
```json
{
    "id": 5,
    "name": "Micel",
    "email": "micel@gmail.com",
    "role": "user",
    "created_at": "2026-08-08T03:41:20.621Z"
}
```
Response 409 - email already registered:
```json
{
    "message": "Email already registered",
    "error": "Conflict",
    "statusCode": 409
}
```
Response 400 - invalid email (email tidak sesuai dengan format email pada umumnya):
```json
{
    "message": [
        "email must be an email"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

---
## USERS
### GET /users/current
```bash
curl --location 'http://localhost:3000/users/current' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - current user:
```json
{
    "id": 3,
    "name": "Cindy Wijaya",
    "email": "cindy@example.com",
    "role": "admin",
    "created_at": "2026-08-03T07:49:37.178Z",
    "accounts": [
        {
            "name": "Cash Wallet",
            "type": "cash",
            "balance": "500"
        },
        {
            "name": "GoPay",
            "type": "e_wallet",
            "balance": "1800"
        }
    ]
}
```
### GET /users (admin)
```bash
curl --location 'http://localhost:3000/users' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - list:
```json
[
    {
        "id": 5,
        "name": "Micel",
        "email": "micel@gmail.com",
        "role": "user",
        "created_at": "2026-08-08T03:41:20.621Z"
    },
    {
        "id": 1,
        "name": "Michelle Hiu",
        "email": "michelle@example.com",
        "role": "user",
        "created_at": "2026-08-03T07:49:37.178Z"
    },
    {
        "id": 2,
        "name": "Andi Pratama",
        "email": "andi@example.com",
        "role": "user",
        "created_at": "2026-08-03T07:49:37.178Z"
    },
    {
        "id": 3,
        "name": "Cindy Wijaya",
        "email": "cindy@example.com",
        "role": "admin",
        "created_at": "2026-08-03T07:49:37.178Z"
    },
    {
        "id": 4,
        "name": "Mikhael Yordan Hiu",
        "email": "mikel@example.com",
        "role": "user",
        "created_at": "2026-08-04T16:24:24.025Z"
    },
    {
        "id": 6,
        "name": "Nini",
        "email": "nini@gmail.com",
        "role": "user",
        "created_at": "2026-08-08T05:25:20.848Z"
    },
    {
        "id": 7,
        "name": "agus",
        "email": "agus@gmail.com",
        "role": "user",
        "created_at": "2026-08-08T06:29:01.442Z"
    },
    {
        "id": 11,
        "name": "Mickey Mouse",
        "email": "mickey@disney.com",
        "role": "user",
        "created_at": "2026-08-11T16:22:46.170Z"
    }
]
```
### GET /users/{id} (admin)
```bash
curl --location 'http://localhost:3000/users/2' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - OK:
```json
{
    "id": 2,
    "name": "Andi Pratama",
    "email": "andi@example.com",
    "role": "user",
    "created_at": "2026-08-03T07:49:37.178Z",
    "accounts": [
        {
            "name": "Cash Wallet",
            "type": "cash",
            "balance": "700"
        },
        {
            "name": "Mandiri Bank",
            "type": "bank",
            "balance": "3200"
        }
    ]
}
```
Response 404 - not found, ketika id yang diinput tidak ada di database:
```json
{
    "message": "User with id 99 not found",
    "error": "Not Found",
    "statusCode": 404
}
```
### POST /users (admin)
```bash
curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data-raw '{
    "name": "Mickey Mouse",
    "email": "mickey@disney.com",
    "password": "miskamuska",
    "role": "user"
}'
```
Response 201 - created:
```json
{
    "id": 11,
    "name": "Mickey Mouse",
    "email": "mickey@disney.com",
    "role": "user",
    "created_at": "2026-08-11T16:22:46.170Z"
}
```
Response 400 - invalid email, ketika email yang dimasukkan tidak dalam format email:
```json
{
    "message": [
        "email must be an email"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```
### DELETE /users/{id} (admin)
```bash
curl --location --request DELETE 'http://localhost:3000/users/10' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - user deleted:
```json
{
    "message": "User deleted",
    "status": 203,
    "id": 10
}
```
Response 404 - id not found, ketika id yang dimasukkan tidak ada di database:
```json
{
    "message": "Id not found",
    "error": "Not Found",
    "statusCode": 404
}
```

---
## ACCOUNTS
### GET /accounts (admin)
```bash
curl --location 'http://localhost:3000/accounts' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - list:
```json
[
    {
        "id": 3,
        "user_id": 2,
        "name": "Cash Wallet",
        "type": "cash",
        "balance": "700",
        "created_at": "2026-08-03T07:49:37.363Z"
    },
    {
        "id": 4,
        "user_id": 2,
        "name": "Mandiri Bank",
        "type": "bank",
        "balance": "3200",
        "created_at": "2026-08-03T07:49:37.363Z"
    },
    {
        "id": 5,
        "user_id": 3,
        "name": "Cash Wallet",
        "type": "cash",
        "balance": "500",
        "created_at": "2026-08-03T07:49:37.363Z"
    },
    {
        "id": 6,
        "user_id": 3,
        "name": "GoPay",
        "type": "e_wallet",
        "balance": "1800",
        "created_at": "2026-08-03T07:49:37.363Z"
    },
    {
        "id": 1,
        "user_id": 1,
        "name": "BCA Bank",
        "type": "bank",
        "balance": "5000",
        "created_at": "2026-08-03T07:49:37.363Z"
    },
    {
        "id": 2,
        "user_id": 1,
        "name": "BCA Bank",
        "type": "bank",
        "balance": "5500",
        "created_at": "2026-08-03T07:49:37.363Z"
    }
]
```
Response 401 - unauthorized, ketika token yang dimasukkan di authorization bukan merupakan token admin:
```json
{
    "message": "No token provided",
    "error": "Unauthorized",
    "statusCode": 401
}
```
### GET /accounts/{id} (admin)
```bash
curl --location 'http://localhost:3000/accounts/1' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - OK:
```json
{
    "id": 1,
    "user_id": 1,
    "name": "BCA Bank",
    "type": "bank",
    "balance": "5000",
    "created_at": "2026-08-03T07:49:37.363Z"
}
```
Response 404 - not found, ketika id yang dimasukkan tidak ada di database (misalnya 99):
```json
{
    "message": "Account with ID 99 not found",
    "error": "Not Found",
    "statusCode": 404
}
```
### GET /accounts/current
```bash
curl --location 'http://localhost:3000/accounts/current' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - personal account (akun yang login):
```json
[
    {
        "id": 2,
        "user_id": 1,
        "name": "Blu BCA",
        "type": "bank",
        "balance": "4500",
        "created_at": "2026-08-03T07:49:37.363Z"
    },
    {
        "id": 1,
        "user_id": 1,
        "name": "BCA Bank",
        "type": "bank",
        "balance": "5075",
        "created_at": "2026-08-03T07:49:37.363Z"
    }
]
```
### GET /accounts/{id}/transactions
```bash
curl --location 'http://localhost:3000/accounts/5/transactions' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - OK:
```json
[
    {
        "id": "20",
        "account_id": 5,
        "category_id": 6,
        "type": "expense",
        "amount": "90",
        "description": "Netflix Subscription",
        "transaction_date": "2026-07-13T00:00:00.000Z",
        "created_at": "2026-08-03T07:49:37.786Z",
        "categories": {
            "id": 6,
            "name": "Entertainment",
            "type": "expense"
        }
    },
    {
        "id": "17",
        "account_id": 5,
        "category_id": 3,
        "type": "expense",
        "amount": "60",
        "description": "Coffee",
        "transaction_date": "2026-07-05T00:00:00.000Z",
        "created_at": "2026-08-03T07:49:37.786Z",
        "categories": {
            "id": 3,
            "name": "Food & Beverage",
            "type": "expense"
        }
    }
]
```
### POST /accounts
```bash
curl --location 'http://localhost:3000/accounts' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{
    "name": "OVO",
    "type": "e_wallet",
    "balance": 7000
}'
```
Response 201 - created, user_id didapat dari token yang diinput:
```json
{
    "id": 7,
    "user_id": 1,
    "name": "OVO",
    "type": "e_wallet",
    "balance": "7000",
    "created_at": "2026-08-05T05:11:17.964Z",
    "users": {
        "id": 1
    }
}
```
Response 400 - bad request, ketika salah satu dto tidak ada:
```json
{
    "message": [
        "name must be shorter than or equal to 255 characters",
        "name must be a string"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```
Response 400 - invalid type, ketika type yang diisi tidak sesuai enum database:
```json
{
    "message": [
        "type must be one of the following values: cash, bank, e_wallet"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```
### PATCH /accounts/{id}
```bash
curl --location --request PATCH 'http://localhost:3000/accounts/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{
    "name": "Blu BCA"
}'
```
Response 200 - successfully updated:
```json
{
    "id": 1,
    "user_id": 1,
    "name": "Blu BCA",
    "type": "bank",
    "balance": "5075",
    "created_at": "2026-08-03T07:49:37.363Z",
    "users": {
        "id": 1,
        "name": "Michelle Hiu"
    }
}
```
Response 404 - not found, ketika id yang diisi tidak ada di database:
```json
{
    "message": "Account with ID 99 not found",
    "error": "Not Found",
    "statusCode": 404
}
```
### DELETE /accounts/{id}
```bash
curl --location --request DELETE 'http://localhost:3000/accounts/8' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - deleted:
```json
{
    "message": "Account deleted",
    "status": 203,
    "id": 8
}
```
Response 404 - id not found, ketika id yang dimasukkan tidak ada di database atau bukan merupakan akun pemilik token (akun orang lain):
```json
{
    "message": "This account not found",
    "error": "Not Found",
    "statusCode": 404
}
```

---
## CATEGORIES
### GET /categories
```bash
curl --location 'http://localhost:3000/categories' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - list:
```json
[
    {
        "id": 1,
        "name": "Salary",
        "type": "income"
    },
    {
        "id": 2,
        "name": "Freelance",
        "type": "income"
    },
    {
        "id": 3,
        "name": "Food & Beverage",
        "type": "expense"
    },
    {
        "id": 4,
        "name": "Transportation",
        "type": "expense"
    },
    {
        "id": 5,
        "name": "Shopping",
        "type": "expense"
    },
    {
        "id": 6,
        "name": "Entertainment",
        "type": "expense"
    },
    {
        "id": 7,
        "name": "Healthcare",
        "type": "expense"
    },
    {
        "id": 9,
        "name": "uang bapak",
        "type": "income"
    },
    {
        "id": 10,
        "name": "uang ibu negara",
        "type": "income"
    }
]
```
### GET /categories/{id}
```bash
curl --location 'http://localhost:3000/categories/2' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - one category:
```json
{
    "id": 2,
    "name": "Freelance",
    "type": "income"
}
```
Response 404 - not found, ketika id yang dimasukkan tidak ada di database:
```json
{
    "message": "Category with ID 99 not found",
    "error": "Not Found",
    "statusCode": 404
}
```
### POST /categories (admin)
```bash
curl --location 'http://localhost:3000/categories' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{
    "name": "uang bapak",
    "type": "income"
}'
```
Response 201 - created:
```json
{
    "id": 9,
    "name": "uang bapak",
    "type": "income"
}
```
Response 403 - forbidden access, ketika token yang dimasukkan bukan token admin:
```json
{
    "message": "Forbidden resource",
    "error": "Forbidden",
    "statusCode": 403
}
```
Response 400 - invalid type, ketika type yang dimasukkan tidak mengikuti enum database:
```json
{
    "message": [
        "type must be one of the following values: income, expense"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```
### PATCH /categories/{id} (admin)
```bash
curl --location --request PATCH 'http://localhost:3000/categories/10' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{
    "name": "Mother'\''s money"
}'
```
Response 200 - updated:
```json
{
    "id": 10,
    "name": "Mother's money",
    "type": "income"
}
```
Response 403 - forbidden access, ketika token user yang dimasukkan di header Authorization:
```json
{
    "message": "Forbidden resource",
    "error": "Forbidden",
    "statusCode": 403
}
```
### DELETE /categories/{id} (admin)
```bash
curl --location --request DELETE 'http://localhost:3000/categories/10' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - deleted:
```json
{
    "message": "Category deleted",
    "status": 203,
    "id": 10
}
```
Response 403 - forbidden access, ketika token user yang dimasukkan di header Authorization:
```json
{
    "message": "Forbidden resource",
    "error": "Forbidden",
    "statusCode": 403
}
```

---
## TRANSACTIONS
### GET /transactions
```bash
curl --location 'http://localhost:3000/transactions' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - list personal transactions:
```json
[
    {
        "id": "1",
        "account_id": 2,
        "category_id": 1,
        "type": "income",
        "amount": "5000",
        "description": "Monthly Salary",
        "transaction_date": "2026-07-01T00:00:00.000Z",
        "created_at": "2026-08-03T07:49:37.786Z"
    },
    {
        "id": "2",
        "account_id": 2,
        "category_id": 2,
        "type": "income",
        "amount": "800",
        "description": "Website Project",
        "transaction_date": "2026-07-05T00:00:00.000Z",
        "created_at": "2026-08-03T07:49:37.786Z"
    },
    {
        "id": "3",
        "account_id": 2,
        "category_id": 3,
        "type": "expense",
        "amount": "120",
        "description": "Lunch",
        "transaction_date": "2026-07-06T00:00:00.000Z",
        "created_at": "2026-08-03T07:49:37.786Z"
    },
    {
        "id": "4",
        "account_id": 2,
        "category_id": 4,
        "type": "expense",
        "amount": "40",
        "description": "Taxi",
        "transaction_date": "2026-07-08T00:00:00.000Z",
        "created_at": "2026-08-03T07:49:37.786Z"
    },
    {
        "id": "5",
        "account_id": 1,
        "category_id": 5,
        "type": "expense",
        "amount": "250",
        "description": "New Headset",
        "transaction_date": "2026-07-10T00:00:00.000Z",
        "created_at": "2026-08-03T07:49:37.786Z"
    },
    {
        "id": "6",
        "account_id": 1,
        "category_id": 6,
        "type": "expense",
        "amount": "75",
        "description": "Cinema",
        "transaction_date": "2026-07-12T00:00:00.000Z",
        "created_at": "2026-08-03T07:49:37.786Z"
    },
    {
        "id": "7",
        "account_id": 2,
        "category_id": 3,
        "type": "expense",
        "amount": "65",
        "description": "Dinner",
        "transaction_date": "2026-07-15T00:00:00.000Z",
        "created_at": "2026-08-03T07:49:37.786Z"
    }
]
```
### GET /transactions/{id}
```bash
curl --location 'localhost:3000/transactions/1' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - one transactions:
```json
{
    "id": "1",
    "account_id": 2,
    "category_id": 1,
    "type": "income",
    "amount": "5000",
    "description": "Monthly Salary",
    "transaction_date": "2026-07-01T00:00:00.000Z",
    "created_at": "2026-08-03T07:49:37.786Z"
}
```
Response 404 - not found, ketika id yang dimasukkan tidak ada di database (contoh: 99):
```json
{
    "message": "Transaction not found",
    "error": "Not Found",
    "statusCode": 404
}
```
### POST /transactions
```bash
curl --location 'localhost:3000/transactions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{   
    "account_id": 2,
    "category_id": 3,
    "type": "expense",
    "amount": "2000",
    "description": "beli cilok",
    "transaction_date": "2026-08-17"
}'
```
Response 201 - created:
```json
[
    {
        "id": "24",
        "account_id": 2,
        "category_id": 3,
        "type": "expense",
        "amount": "2000",
        "description": "beli cilok",
        "transaction_date": "2026-08-17T00:00:00.000Z",
        "created_at": "2026-08-17T16:08:52.285Z",
        "accounts": {
            "balance": "5500"
        },
        "categories": {
            "name": "Food & Beverage",
            "type": "expense"
        }
    },
    {
        "id": 2,
        "user_id": 1,
        "name": "Blu BCA",
        "type": "bank",
        "balance": "3500",
        "created_at": "2026-08-03T07:49:37.363Z"
    }
]
```
Response 400 - negative amount, ketika amount yang dimasukkan merupakan bilangan negatif:
```json
{
    "message": "Amount must be greater than zero",
    "error": "Bad Request",
    "statusCode": 400
}
```
Response 400 - unknown fields, ketika terdapat input di luar dto:
```json
{
    "message": [
        "property foo should not exist"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```
### PATCH /transactions/{id}
```bash
curl --location --request PATCH 'http://localhost:3000/transactions/26' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{
    "amount": "1000"
}'
```
Response 200 - balance recalculated:
```json
{
    "id": "26",
    "account_id": 2,
    "category_id": 3,
    "type": "expense",
    "amount": "1000",
    "description": "beli cilok",
    "transaction_date": "2020-08-17T00:00:00.000Z",
    "created_at": "2026-08-17T16:30:08.395Z",
    "accounts": {
        "balance": "4500"
    },
    "categories": {
        "name": "Food & Beverage",
        "type": "expense"
    }
}
```
### DELETE /transactions/{id}
```bash
curl --location --request DELETE 'http://localhost:3000/transactions/22' \
--header 'Authorization: Bearer <TOKEN>'
```
Response 200 - deleted, balance recalculated:
```json
{
    "deleted": {
        "id": "22",
        "account_id": 5,
        "category_id": 4,
        "type": "expense",
        "amount": "20",
        "description": "Parking Fee",
        "transaction_date": "2026-07-18T00:00:00.000Z",
        "created_at": "2026-08-03T07:49:37.786Z",
        "accounts": {
            "user_id": 3,
            "name": "Cash Wallet",
            "balance": "500"
        }
    },
    "newBalance": "520",
    "message": "Transaction deleted",
    "status": 203,
    "id": 22
}
```

## Dokumentasi dengan Menggunakan Script
notes: postman login dengan akun id 1, role user.
![result1](image.png)
![result2](image-1.png)
![result3](image-2.png)