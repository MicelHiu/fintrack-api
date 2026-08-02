/* Users */
INSERT INTO users (name, email, password, role) VALUES
('Michelle Hiu', 'michelle@example.com', 'password123', 'user'),
('Andi Pratama', 'andi@example.com', 'password123', 'user'),
('Cindy Wijaya', 'cindy@example.com', 'password123', 'admin');

/* accounts */
INSERT INTO accounts (user_id, name, type, balance) VALUES
(1, 'Cash Wallet', 'cash', 1250.00),
(1, 'BCA Bank', 'bank', 5500.00),

(2, 'Cash Wallet', 'cash', 700.00),
(2, 'Mandiri Bank', 'bank', 3200.00),

(3, 'Cash Wallet', 'cash', 500.00),
(3, 'GoPay', 'e-wallet', 1800.00);

/* categories */
INSERT INTO categories (name, type) VALUES
('Salary', 'income'),
('Freelance', 'income'),
('Food & Beverage', 'expense'),
('Transportation', 'expense'),
('Shopping', 'expense'),
('Entertainment', 'expense');

/* transactions */
INSERT INTO transactions
(account_id, category_id, type, amount, description, transaction_date)
VALUES
-- Michelle
(2, 1, 'income', 5000.00, 'Monthly Salary', '2026-07-01'),
(2, 2, 'income', 800.00, 'Website Project', '2026-07-05'),
(2, 3, 'expense', 120.00, 'Lunch', '2026-07-06'),
(2, 4, 'expense', 40.00, 'Taxi', '2026-07-08'),
(1, 5, 'expense', 250.00, 'New Headset', '2026-07-10'),
(1, 6, 'expense', 75.00, 'Cinema', '2026-07-12'),
(2, 3, 'expense', 65.00, 'Dinner', '2026-07-15'),
-- Andi
(4, 1, 'income', 3200.00, 'Monthly Salary', '2026-07-01'),
(3, 3, 'expense', 80.00, 'Breakfast', '2026-07-03'),
(4, 4, 'expense', 30.00, 'Bus Ticket', '2026-07-05'),
(4, 5, 'expense', 200.00, 'Shoes', '2026-07-09'),
(3, 6, 'expense', 50.00, 'Game Top Up', '2026-07-12'),
(4, 2, 'income', 450.00, 'Logo Design', '2026-07-17'),
(4, 3, 'expense', 90.00, 'Restaurant', '2026-07-18'),
-- Cindy
(6, 1, 'income', 6000.00, 'Monthly Salary', '2026-07-01'),
(6, 2, 'income', 1200.00, 'Consulting', '2026-07-04'),
(5, 3, 'expense', 60.00, 'Coffee', '2026-07-05'),
(6, 4, 'expense', 25.00, 'Train Ticket', '2026-07-07'),
(6, 5, 'expense', 350.00, 'Shopping Mall', '2026-07-11'),
(5, 6, 'expense', 90.00, 'Netflix Subscription', '2026-07-13'),
(6, 3, 'expense', 110.00, 'Dinner', '2026-07-16'),
(5, 4, 'expense', 20.00, 'Parking Fee', '2026-07-18');

/* budgets */
INSERT INTO budgets (user_id, category_id, month, limit_amount) VALUES
(1, 3, '2026-07-01', 500.00),
(1, 5, '2026-07-01', 800.00),

(2, 3, '2026-07-01', 400.00),
(2, 6, '2026-07-01', 300.00),

(3, 3, '2026-07-01', 700.00),
(3, 5, '2026-07-01', 1000.00);

INSERT INTO categories (name, type)
VALUES ('Healthcare', 'expense');