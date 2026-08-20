# Smoke Test — FinTrack API

| | |
|---|---|
| Tanggal | 2026-08-18 23:25 WIB |
| Environment | local |
| base_url | http://localhost:3000 |
| Commit | 7f9f102 |
| Dijalankan oleh | Michelle |

## Hasil Melalui Postman Collection
| # | Endpoint | Method | Ekspektasi | Hasil | Catatan |
|---|----------|--------|-----------|-------|---------|
| 1 | `/` | GET | 200, server merespons (bukan timeout) | ✅ | |
| 2 | `/accounts` | GET | 200, body array, panjang ≥ 1 (bukti seed jalan) | ✅ | |
| 3 | `/accounts/1` | GET | 200, body punya `id`, `name`, `balance` | ✅ | |
| 4 | `/accounts/9999` | GET | 404, bukan 200 dengan body kosong | ✅ | |
| 5 | `/categories` | GET | 200, array, panjang ≥ 6 | ✅ | |
| 6 | `/transactions` | POST | 201, body punya `id` hasil generate DB | ✅ | |
| 7 | `/transactions` | POST body `amount: -1000` | 400, pesan `amount must be a positive number` | ✅ | |
| 8 | `/transactions` body field asing `foo` | POST | 400 (`forbidNonWhitelisted`) | ✅ | |
| 9 | `/accounts/1/transactions` | GET | 200, tiap item punya objek `category` bersarang | ✅ | bukti `include` |
| 10 | `/transactions/27` | DELETE | 200, membersihkan data uji dari langkah 6 | ✅ | |

## Kesimpulan

**GO** — 10/10 pass. Deploy dinyatakan sehat.

## Dokumentasi dengan Menggunakan Script
notes: postman login dengan akun id 1, role user.
![result1](image.png)
![result2](image-1.png)
![result3](image-2.png)