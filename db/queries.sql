/* =========================================================
1. Filtered SELECT
Menampilkan semua transaksi expense dengan nominal lebih dari 100.
========================================================= */

SELECT *
FROM transactions
WHERE type = 'expense'
    AND amount > 100;


/* =========================================================
2. JOIN 3 Tables
Menampilkan nama user, nama account, dan detail transaksi.
(users -> accounts -> transactions)
========================================================= */

SELECT
    u.name AS user_name,
    a.name AS account_name,
    t.type,
    t.amount,
    t.transaction_date
FROM users u
JOIN accounts a
    ON u.id = a.user_id
JOIN transactions t
    ON a.id = t.account_id
ORDER BY t.transaction_date;


/* =========================================================
3. JOIN 3 Tables
Menampilkan nama user, kategori transaksi,
nominal, dan deskripsi transaksi.
(users -> accounts -> transactions -> categories)
========================================================= */

SELECT
    u.name AS user_name,
    c.name AS category,
    t.amount,
    t.description,
    t.transaction_date
FROM users u
JOIN accounts a
    ON u.id = a.user_id
JOIN transactions t
    ON a.id = t.account_id
JOIN categories c
    ON t.category_id = c.id
ORDER BY t.transaction_date;


/* =========================================================
4. GROUP BY Aggregation
Menghitung total pengeluaran untuk setiap kategori.
========================================================= */

SELECT
    c.name AS category,
    SUM(t.amount) AS total_expense
FROM transactions t
JOIN categories c
    ON t.category_id = c.id
WHERE t.type = 'expense'
GROUP BY c.name
ORDER BY total_expense DESC;


/* =========================================================
5. GROUP BY Aggregation
Menghitung jumlah transaksi yang dimiliki setiap user.
========================================================= */

SELECT
    u.name,
    COUNT(t.id) AS total_transactions
FROM users u
JOIN accounts a
    ON u.id = a.user_id
JOIN transactions t
    ON a.id = t.account_id
GROUP BY u.name
ORDER BY total_transactions DESC;


/* =========================================================
6. Advanced SQL (Subquery)
Menampilkan transaksi yang nilainya lebih besar
dari rata-rata seluruh transaksi.
========================================================= */

SELECT
    id,
    amount,
    description
FROM transactions
WHERE amount >
(
    SELECT AVG(amount)
    FROM transactions
);


/* =========================================================
7. Advanced SQL (Window Function)
Memberikan ranking transaksi berdasarkan nominal terbesar.
========================================================= */

SELECT
    id,
    amount,
    description,
    RANK() OVER (ORDER BY amount DESC) AS transaction_rank
FROM transactions;


/* =========================================================
8. LEFT JOIN
Menampilkan semua kategori termasuk kategori
yang belum memiliki transaksi.
========================================================= */

SELECT
    c.id,
    c.name,
    COUNT(t.id) AS total_transactions
FROM categories c
LEFT JOIN transactions t
    ON c.id = t.category_id
GROUP BY c.id, c.name
ORDER BY c.id;