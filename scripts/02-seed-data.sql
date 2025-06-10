-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES
('Beverages', 'Soft drinks, coffee, energy drinks', '/images/categories/beverages.jpg'),
('Snacks', 'Chips, candy, nuts', '/images/categories/snacks.jpg'),
('Food', 'Ready-to-eat meals, sandwiches', '/images/categories/food.jpg'),
('Personal Care', 'Toiletries, health products', '/images/categories/personal-care.jpg'),
('Household', 'Cleaning supplies, batteries', '/images/categories/household.jpg');

-- Insert sample stores
INSERT INTO stores (name, address, latitude, longitude, phone) VALUES
('QuickMart Downtown', '123 Main St, Downtown', 40.7128, -74.0060, '(555) 123-4567'),
('QuickMart Uptown', '456 Broadway, Uptown', 40.7589, -73.9851, '(555) 234-5678'),
('QuickMart Midtown', '789 5th Ave, Midtown', 40.7505, -73.9934, '(555) 345-6789'),
('QuickMart East Side', '321 Park Ave, East Side', 40.7614, -73.9776, '(555) 456-7890'),
('QuickMart West Side', '654 Columbus Ave, West Side', 40.7831, -73.9712, '(555) 567-8901');

-- Insert sample products
INSERT INTO products (name, description, price, category_id, image_url, barcode, stock_quantity, loyalty_points_earned) VALUES
-- Beverages
('Coca-Cola 20oz', 'Classic Coca-Cola bottle', 2.49, 1, '/images/products/coke.jpg', '049000028911', 100, 2),
('Red Bull Energy Drink', 'Original energy drink', 3.99, 1, '/images/products/redbull.jpg', '090127533017', 50, 4),
('Starbucks Frappuccino', 'Mocha coffee drink', 4.49, 1, '/images/products/frappuccino.jpg', '012000161155', 30, 4),
('Dasani Water 16.9oz', 'Purified water bottle', 1.99, 1, '/images/products/dasani.jpg', '049000028928', 200, 1),

-- Snacks
('Doritos Nacho Cheese', 'Classic nacho cheese chips', 3.49, 2, '/images/products/doritos.jpg', '028400064316', 75, 3),
('Snickers Bar', 'Chocolate peanut candy bar', 1.99, 2, '/images/products/snickers.jpg', '040000000013', 120, 2),
('Pringles Original', 'Stackable potato chips', 2.99, 2, '/images/products/pringles.jpg', '038000845000', 60, 3),
('Kit Kat Bar', 'Crispy wafer chocolate bar', 1.79, 2, '/images/products/kitkat.jpg', '034000002207', 90, 2),

-- Food
('7-Select Sandwich', 'Turkey and cheese sandwich', 5.99, 3, '/images/products/sandwich.jpg', '123456789012', 25, 6),
('Hot Dog Roller', 'Fresh hot dog', 2.99, 3, '/images/products/hotdog.jpg', '123456789013', 40, 3),
('Pizza Slice', 'Pepperoni pizza slice', 3.99, 3, '/images/products/pizza.jpg', '123456789014', 20, 4),
('Instant Ramen', 'Cup noodles', 1.49, 3, '/images/products/ramen.jpg', '070662002001', 80, 1),

-- Personal Care
('Toothbrush Travel', 'Compact travel toothbrush', 2.99, 4, '/images/products/toothbrush.jpg', '123456789015', 45, 3),
('Hand Sanitizer', '2oz hand sanitizer', 1.99, 4, '/images/products/sanitizer.jpg', '123456789016', 100, 2),
('Advil Pain Relief', 'Ibuprofen tablets', 6.99, 4, '/images/products/advil.jpg', '305730164016', 30, 7),

-- Household
('AA Batteries 4-pack', 'Alkaline batteries', 4.99, 5, '/images/products/batteries.jpg', '123456789017', 35, 5),
('Paper Towels', 'Single roll paper towels', 3.49, 5, '/images/products/papertowels.jpg', '123456789018', 25, 3);

-- Insert sample promotions
INSERT INTO promotions (title, description, image_url, promo_type, discount_percentage, start_date, end_date) VALUES
('Summer Energy Boost', 'Buy 2 energy drinks, get 1 free!', '/images/promos/energy-boost.jpg', 'discount', 33.33, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days'),
('Movie Night Combo', 'Snacks + Drink combo for movie lovers', '/images/promos/movie-night.jpg', 'tie-in', 15.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '14 days'),
('Win a Year of Free Coffee', 'Enter to win free coffee for a year!', '/images/promos/coffee-sweepstakes.jpg', 'sweepstakes', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '60 days'),
('Back to School Special', '20% off all snacks and beverages', '/images/promos/back-to-school.jpg', 'discount', 20.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '21 days');

-- Insert loyalty rewards
INSERT INTO loyalty_rewards (name, description, points_required, reward_type, reward_value) VALUES
('Free Coffee', 'Get a free medium coffee', 50, 'free_item', 2.99),
('$5 Off Purchase', '$5 off your next purchase of $20 or more', 100, 'discount', 5.00),
('Free Snack', 'Choose any snack under $3', 75, 'free_item', 3.00),
('$10 Cashback', '$10 cashback to your account', 200, 'cashback', 10.00),
('Free Energy Drink', 'Get any energy drink free', 80, 'free_item', 3.99);

-- Insert sample admin user
INSERT INTO users (email, password_hash, first_name, last_name, phone, role, loyalty_points) VALUES
('admin@quickmart.com', '$2b$10$rOzJaHq.8WnYVeQq5u5fKOqV8qF7qF7qF7qF7qF7qF7qF7qF7qF7q', 'Admin', 'User', '(555) 000-0000', 'admin', 0),
('customer@example.com', '$2b$10$rOzJaHq.8WnYVeQq5u5fKOqV8qF7qF7qF7qF7qF7qF7qF7qF7qF7q', 'John', 'Doe', '(555) 111-1111', 'customer', 150);
