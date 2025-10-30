-- Create tables
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    seller VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    discounted_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Junction table with cascade deletion
CREATE TABLE IF NOT EXISTS book_tags (
    book_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (book_id, tag_id),
    FOREIGN KEY (book_id) 
        REFERENCES books(id) 
        ON DELETE CASCADE,
    FOREIGN KEY (tag_id) 
        REFERENCES tags(id) 
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table to track each order's metadata
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order items table to track individual books in each order
CREATE TABLE IF NOT EXISTS order_items (
    order_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (order_id, book_id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample datas
-- Books
INSERT INTO books (title, seller, description, image, price, discounted_price) VALUES
('The Great Gatsby', 'ClassicBooks Co.', 'A story of the Jazz Age', '1.jpg', 24.99, 19.99),
('Python for Beginners', 'TechBooks Ltd', 'Learn Python programming', '2.jpg', 39.99, NULL),
('Master Chef Recipes', 'Foodie Publications', 'Culinary delights for home chefs', '3.jpg', 29.99, 24.99),
('The Hobbit', 'Fantasy Books Inc', 'Epic fantasy adventure', '4.png', 29.99, 24.99),
('The Martian', 'Sci-Fi Books Co', 'Survival story on Mars', '5.jpg', 27.95, NULL),
('Becoming', 'Memoir Press', 'Michelle Obama autobiography', '6.jpg', 35.00, 29.99),
('Atomic Habits', 'SelfHelp Publications', 'Build good habits framework', '7.jpg', 28.50, NULL),
('The Da Vinci Code', 'Mystery House', 'Religious conspiracy thriller', '8.jpg', 19.99, 15.99),
('1984', 'ClassicBooks Co', 'Dystopian political novel', '9.jpg', 22.50, 18.75),
('The Lean Startup', 'Business Books Ltd', 'Entrepreneurship methodology', '10.jpg', 34.99, 29.99),
('Pride and Prejudice', 'ClassicBooks Co.', 'Romantic novel of manners', '11.jpg', 19.99, 15.99),
('The Art of War', 'History Press', 'Ancient military treatise', '12.jpg', 14.95, NULL),
('The Lion, the Witch and the Wardrobe', 'Fantasy Books Inc', 'Children''s fantasy adventure', '13.jpg', 22.50, 18.99),
('Sapiens: A Brief History of Humankind', 'NonFiction Ltd', 'Evolution of human societies', '14.jpg', 29.99, 24.50),
('The Silent Patient', 'Mystery House', 'Psychological thriller', '15.jpg', 25.00, 21.99),
('Educated', 'Memoir Press', 'Memoir of survival and education', '16.jpg', 27.95, NULL),
('Cracking the Coding Interview', 'TechBooks Ltd', 'Programming interview preparation', '17.jpg', 49.99, 44.50),
('The Midnight Library', 'Modern Novels', 'Speculative fiction about life choices', '18.jpg', 24.99, 19.99),
('Good Omens', 'Fantasy Books Inc', 'Comedic apocalypse novel', '19.jpg', 21.50, 18.25),
('The Alchemist', 'Philosophy Press', 'Philosophical novel about destiny', '20.jpg', 18.99, 16.50),
('Dune', 'Sci-Fi Books Co', 'Epic space opera adventure', '21.jpg', 29.99, 24.99),         
('Brave New World', 'ClassicBooks Co.', 'Dystopian future society', '22.jpg', 19.99, NULL),  
('The Catcher in the Rye', 'ClassicBooks Co.', 'Coming-of-age novel', '23.jpg', 18.50, NULL),
('Steve Jobs', 'Biography Press', 'Biography of Apple’s co-founder', '24.jpg', 32.99, NULL),
('The Power of Habit', 'SelfHelp Publications', 'Understanding habit formation', '25.jpg', 26.00, NULL),  
('The Subtle Art of Not Giving a F*ck', 'SelfHelp Publications', 'Counterintuitive life advice', '26.jpg', 23.99, NULL),  
('The Shining', 'Horror Books Inc', 'Psychological horror novel', '27.jpg', 21.99, NULL),    
('The 5 AM Club', 'SelfHelp Publications', 'Morning routine for success', '28.jpg', 24.99, NULL),  
('To Kill a Mockingbird', 'ClassicBooks Co.', 'Novel about racial injustice', '29.jpg', 18.99, NULL),  
('Rich Dad Poor Dad', 'Business Books Ltd', 'Financial education guide', '30.jpg', 19.99, NULL),  
('The Girl with the Dragon Tattoo', 'Mystery House', 'Nordic noir thriller', '31.jpg', 22.99, 19.99),  
('The Road', 'Modern Novels', 'Post-apocalyptic survival story', '32.jpg', 20.50, NULL),      
('The War of Art', 'SelfHelp Publications', 'Overcoming creative resistance', '33.jpg', 16.99, NULL),  
('A Brief History of Time', 'Science Books Ltd', 'Stephen Hawking’s exploration of time', '34.jpg', 25.99, NULL),  
('The Witcher: The Last Wish', 'Fantasy Books Inc', 'Fantasy short stories about a monster hunter', '35.jpg', 21.50, 18.99),  
('Jurassic Park', 'Sci-Fi Books Co', 'Thrilling dinosaur adventure', '36.jpg', 22.99, NULL),  
('The Four Agreements', 'Philosophy Press', 'Ancient Toltec wisdom', '37.jpg', 17.50, NULL),  
('It', 'Horror Books Inc', 'Classic horror novel by Stephen King', '38.jpg', 24.50, NULL),    
('Dracula', 'ClassicBooks Co.', 'Gothic horror novel', '39.jpg', 15.99, NULL),                
('Moby Dick', 'ClassicBooks Co.', 'Epic tale of obsession and revenge', '40.jpg', 18.99, NULL),  
('Meditations', 'Philosophy Press', 'Stoic philosophy by Marcus Aurelius', '41.jpg', 14.99, NULL),  
('The Name of the Wind', 'Fantasy Books Inc', 'Epic fantasy novel', '42.jpg', 24.99, 19.99),  
('Zero to One', 'Business Books Ltd', 'Startup insights by Peter Thiel', '43.jpg', 27.99, 22.99), 
('The Psychology of Money', 'SelfHelp Publications', 'Timeless lessons on wealth', '44.jpg', 23.99, 19.99), 
('Inferno', 'Mystery House', 'Thrilling mystery by Dan Brown', '45.jpg', 21.50, 18.50),       
('The Stand', 'Horror Books Inc', 'Post-apocalyptic horror novel', '46.jpg', 28.99, 24.99),   
('Man’s Search for Meaning', 'Philosophy Press', 'Holocaust memoir and philosophy', '47.jpg', 16.99, 14.50),  
('Norwegian Wood', 'Modern Novels', 'Haruki Murakami’s coming-of-age story', '48.jpg', 22.50, 18.99), 
('The Fellowship of the Ring', 'Fantasy Books Inc', 'First book in The Lord of the Rings', '49.jpg', 25.99, 21.99),  
('Hyperion', 'Sci-Fi Books Co', 'Epic science fiction novel', '50.jpg', 26.99, 22.50),
('The Waste Land', 'Poetry Press', 'A modernist masterpiece by T.S. Eliot', '51.jpg', 19.99, NULL),
('Milk and Honey', 'Poetry Books Ltd', 'A collection of poetry about love and healing by Rupi Kaur', '52.jpg', 15.99, 12.99),
('The Sun and Her Flowers', 'Poetry Books Ltd', 'Poetry collection by Rupi Kaur exploring growth and healing', '53.jpg', 16.99, NULL),
('Leaves of Grass', 'ClassicBooks Co.', 'Walt Whitman’s seminal poetry collection', '54.jpg', 18.50, 15.00),
('The Road Not Taken', 'Poetry Press', 'A classic poem by Robert Frost', '55.jpg', 12.99, 10.99),
('The Complete Poems of Emily Dickinson', 'Poetry House', 'Collected works of Emily Dickinson', '56.jpg', 25.00, NULL),
('Ariel', 'Poetry Books Ltd', 'A collection by Sylvia Plath', '57.jpg', 21.50, NULL),
('Howl', 'Poetry Press', 'An iconic beat poem by Allen Ginsberg', '58.jpg', 19.99, 17.50),
('The Prophet', 'Philosophy Press', 'Kahlil Gibran’s poetic philosophical work', '59.jpg', 14.99, NULL),
('Selected Poems', 'Poetry Press', 'Works of William Blake', '60.jpg', 20.99, 17.99),
('The Poetry of Pablo Neruda', 'Poetry Books Ltd', 'Selected works of Pablo Neruda', '61.jpg', 23.99, NULL),
('Rising Tides', 'Poetry House', 'A collection of poems about resilience and hope', '62.png', 18.99, 15.99),
('The Essential Rumi', 'Poetry Books Ltd', 'Timeless mystical poetry by Jalal ad-Din Rumi', '63.jpg', 22.50, NULL),
('The Colossus', 'Poetry Books Ltd', 'Sylvia Plath’s first poetry collection', '64.jpg', 16.99, 14.50),
('The Penguin Anthology of Twentieth-Century American Poetry', 'Poetry Press', 'A comprehensive anthology of 20th-century American poets', '65.jpg', 28.99, 24.99);


-- Tags
INSERT INTO tags (name) VALUES
('Fiction'), ('Classic'), ('Programming'), ('Blockbuster'), ('Cooking'), ('Top Pick'),
('Mystery'), ('Science Fiction'), ('Non-Fiction'), ('Self-Help'), ('Business'),
('Fantasy'), ('Thriller'), ('Dystopian'), ('Memoir'), ('Technology'), ('Entrepreneurship'), ('Adventure'),
('Romance'), ('History'), ('Children'), ('Psychology'), ('Philosophy'),
('Biography'), ('Young Adult'), ('Horror'), ('Travel'), ('Art'),
('Health'), ('Fitness'), ('Religion'), ('Spirituality'), ('Science'),
('Mathematics'), ('Politics'), ('True Crime'), ('Humor'), ('LGBTQ+'),
('Graphic Novel'), ('Short Stories'), ('Literary Fiction'), ('Cookbooks'),
('Food & Drink'), ('Parenting'), ('Education'), ('Language'), ('Poetry'),
('Music'), ('Film'), ('Sports'), ('Gardening'), ('Home Improvement'),
('Sustainability'), ('Environment'), ('Feminism'), ('Social Justice'),
('Cultural'), ('Contemporary'), ('Urban Fantasy'), ('Steampunk'),
('Cyberpunk'), ('Post-Apocalyptic'), ('Time Travel'), ('Space Opera'),
('Artificial Intelligence'), ('Web Development'), ('Mobile Apps'),
('Data Science'), ('Machine Learning'), ('Cybersecurity'), ('Blockchain'),
('Virtual Reality'), ('Robotics'), ('Neuroscience'), ('Anthropology'),
('Economics'), ('Leadership'), ('Marketing'), ('Finance'), ('Investing'),
('Career Development'), ('Journalism'), ('Media Studies'), ('Architecture'),
('Design'), ('Fashion'), ('Crafts'), ('DIY'), ('Astrology'), ('Mythology'),
('Gaming'), ('Board Games'), ('Puzzles'), ('Activism'),
('Autobiography'), ('Textbook'), ('Reference'), ('Drama'), ('Satire'),
('Western'), ('Supernatural'), ('Vampires'), ('Zombies'), ('Military'),
('Legal Thriller'), ('Medical'), ('Agriculture'), ('Transportation'),
('Photography'), ('Theatre'), ('Biotechnology'), ('Nanotechnology');

-- Book-Tag relationships
INSERT INTO book_tags (book_id, tag_id) VALUES
-- The Great Gatsby (5 tags)
(1, 1), (1, 2), (1, 6), (1, 19), (1, 13),(1, 39), (1, 85), (1, 86), (1, 98), (1, 48),
-- Python for Beginners (4 tags)
(2, 3), (2, 4), (2, 16), (2, 9), (2, 65), (2, 45),
-- Master Chef Recipes (6 tags)
(3, 5), (3, 6), (3, 4), (3, 9), (3, 10), (3, 22),(3, 41), (3, 42),
-- The Hobbit (5 tags)
(4, 6), (4, 12), (4, 18), (4, 2), (4, 1), (4, 63), (4, 90), (4, 27),
-- The Martian (4 tags)
(5, 8), (5, 18), (5, 6), (5, 9), (5, 32), (5, 107), (5, 53), (5, 51),
-- Becoming (5 tags)
(6, 15), (6, 9), (6, 6), (6, 20), (6, 22), (6, 57), (6, 95), (6, 55),
-- Atomic Habits (6 tags)
(7, 10), (7, 9), (7, 6), (7, 11), (7, 23), (7, 16),(7, 22), (7, 75), (7, 29),
-- The Da Vinci Code (5 tags)
(8, 7), (8, 13), (8, 6), (8, 20), (8, 1),(8, 28), (8, 39), (8, 49),
-- 1984 (4 tags)
(9, 1), (9, 2), (9, 14), (9, 23),(9, 34), (9, 98),
-- The Lean Startup (5 tags)
(10, 11), (10, 17), (10, 6), (10, 9), (10, 16), (10, 72), (10, 78), (10, 77),
-- Pride and Prejudice (4 tags)
(11, 1), (11, 2), (11, 19), (11, 6),(11, 39),
-- The Art of War (5 tags)
(12, 9), (12, 20), (12, 6), (12, 23), (12, 11), (12, 104),
-- The Lion, the Witch... (6 tags)
(13, 12), (13, 21), (13, 18), (13, 2), (13, 1), (13, 6),(13, 87),
-- Sapiens (5 tags)
(14, 9), (14, 6), (14, 20), (14, 16), (14, 23),(14, 70), (14, 83), (14, 76),
-- The Silent Patient (4 tags)
(15, 7), (15, 13), (15, 22), (15, 1),(15, 75),
-- Educated (5 tags)
(16, 15), (16, 9), (16, 6), (16, 20), (16, 22),(16, 57), (16, 95),
-- Cracking the Coding... (6 tags)
(17, 3), (17, 16), (17, 11), (17, 6), (17, 9), (17, 4), (17, 67), (17, 81),
-- The Midnight Library (5 tags)
(18, 1), (18, 8), (18, 23), (18, 6), (18, 10),(18, 85), (18, 58),
-- Good Omens (4 tags)
(19, 1), (19, 12), (19, 18), (19, 6),(19, 36), (19, 99),
-- The Alchemist (5 tags)
(20, 1), (20, 23), (20, 6), (20, 18), (20, 10), (20, 57), (20, 90),
-- Dune (21)
(21, 8), (21, 63), (21, 18), (21, 6), (21, 2), (21, 111), (21, 64),
-- Brave New World (22)
(22, 14), (22, 2), (22, 8), (22, 1), (22, 34), (22, 35),
-- The Catcher in the Rye (23)
(23, 1), (23, 2), (23, 25), (23, 22), (23, 39), (23, 98),
-- Steve Jobs (24)
(24, 24), (24, 9), (24, 16), (24, 17), (24, 11), (24, 72), (24, 95),
-- The Power of Habit (25)
(25, 10), (25, 22), (25, 9), (25, 6), (25, 11), (25, 70), (25, 29),
-- The Subtle Art... (26)
(26, 10), (26, 36), (26, 9), (26, 6), (26, 23), (26, 99),
-- The Shining (27)
(27, 26), (27, 13), (27, 22), (27, 87), (27, 101),
-- The 5 AM Club (28)
(28, 10), (28, 11), (28, 72), (28, 75), (28, 6), (28, 30),
-- To Kill a Mockingbird (29)
(29, 2), (29, 1), (29, 57), (29, 39), (29, 85), (29, 98),
-- Rich Dad Poor Dad (30)
(30, 11), (30, 74), (30, 75), (30, 9), (30, 6), (30, 80), (30, 79), (30, 76),
-- The Girl with... (31)
(31, 7), (31, 13), (31, 35), (31, 37), (31, 57),
-- The Road (32)
(32, 62), (32, 14), (32, 1), (32, 39), (32, 85), (32, 107), (32, 104),
-- The War of Art (33)
(33, 10), (33, 28), (33, 23), (33, 17), (33, 75),
-- A Brief History... (34)
(34, 32), (34, 9), (34, 6), (34, 33), (34, 8),
-- The Witcher... (35)
(35, 12), (35, 38), (35, 18), (35, 89), (35, 87), (35, 91),
-- Jurassic Park (36)
(36, 8), (36, 13), (36, 18), (36, 16), (36, 32),
-- The Four Agreements (37)
(37, 23), (37, 10), (37, 31), (37, 9), (37, 57),
-- It (38)
(38, 26), (38, 87), (38, 13), (38, 25), (38, 85), (38, 101),
-- Dracula (39)
(39, 2), (39, 26), (39, 87), (39, 1), (39, 85), (39, 101),
-- Moby Dick (40)
(40, 2), (40, 18), (40, 39), (40, 1), (40, 85), (40, 98),  
-- Meditations (41)
(41, 23), (41, 2), (41, 9), (41, 72), (41, 85),
-- The Name of the Wind (42)
(42, 12), (42, 18), (42, 6), (42, 1), (42, 89),
-- Zero to One (43)
(43, 11), (43, 17), (43, 72), (43, 9), (43, 66), (43, 76), 
-- The Psychology... (44)
(44, 74), (44, 22), (44, 10), (44, 9), (44, 75), (44, 79), (44, 80),  
-- Inferno (45)
(45, 7), (45, 13), (45, 28), (45, 1), (45, 39), (45, 49),
-- The Stand (46)
(46, 26), (46, 62), (46, 8), (46, 13), (46, 85), (46, 104),
-- Man’s Search... (47)
(47, 23), (47, 15), (47, 22), (47, 9), (47, 85), (47, 56),  
-- Norwegian Wood (48)
(48, 39), (48, 56), (48, 1), (48, 85), (48, 22), (48, 47),  
-- Fellowship... (49)
(49, 12), (49, 18), (49, 2), (49, 6), (49, 87), (49, 90),  
-- Hyperion (50)
(50, 8), (50, 63), (50, 18), (50, 6), (50, 39), (50, 64),  
-- The Waste Land (51)
(51, 47), (51, 39), (51, 19), (51, 23), (51, 22), (51, 43),
-- Milk and Honey (52)
(52, 47), (52, 39), (52, 23), (52, 48), (52, 22), (52, 56),
-- The Sun and Her Flowers (53)
(53, 47), (53, 39), (53, 23), (53, 48), (53, 22), (53, 56),
-- Leaves of Grass (54)
(54, 47), (54, 2), (54, 39), (54, 1), (54, 20), (54, 18),
-- The Road Not Taken (55)
(55, 47), (55, 2), (55, 1), (55, 6), (55, 9), (55, 38),
-- The Complete Poems of Emily Dickinson (56)
(56, 47), (56, 9), (56, 1), (56, 13), (56, 22), (56, 27),
-- Ariel (57)
(57, 47), (57, 9), (57, 39), (57, 23), (57, 48), (57, 20),
-- Howl (58)
(58, 47), (58, 13), (58, 6), (58, 1), (58, 22), (58, 35),
-- The Prophet (59)
(59, 47), (59, 39), (59, 22), (59, 23), (59, 16), (59, 43),
-- Selected Poems (60)
(60, 47), (60, 1), (60, 2), (60, 5), (60, 15), (60, 16),
-- The Poetry of Pablo Neruda (61)
(61, 47), (61, 39), (61, 1), (61, 18), (61, 22), (61, 24),
-- Rising Tides (62)
(62, 47), (62, 22), (62, 16), (62, 20), (62, 39), (62, 18),
-- The Essential Rumi (63)
(63, 47), (63, 39), (63, 16), (63, 6), (63, 1), (63, 10),
-- The Colossus (64)
(64, 47), (64, 9), (64, 23), (64, 13), (64, 18), (64, 56),
-- The Penguin Anthology of Twentieth-Century American Poetry (65)
(65, 47), (65, 23), (65, 16), (65, 1), (65, 6), (65, 9);

-- Admin
INSERT INTO admins (username, password, email) VALUES
('admin', '123', 'admin@gmail.com'),
('admin1', 'admin_pass1', 'admin1@gmail.com'),
('admin2', 'admin_pass2', 'admin2@gmail.com'),
('super_admin', 'super_secure', 'super_admin@gmail.com');

-- User
INSERT INTO users (username, password, email, date_of_birth) VALUES
('user', 'Password1!', 'user@gmail.com', '1990-01-15'),
('john_doe', 'M@r1oP!zz', 'john.doe@gmail.com', '1990-01-15'),
('jane_smith', 'S3cur1ty@', 'jane.smith@gmail.com', '1985-08-22'),
('alice_wonder', 'C@tL0ver5', 'alice.wonder@gmail.com', '1992-12-05'),
('bob_builder', 'Tr@v3lEr1', 'bob.builder@gmail.com', '1980-06-30'),
('charlie_choco', 'B@k3ry12#', 'charlie.choco@gmail.com', '1995-03-11'),
('emma_watson', 'H3ll0!Wrld', 'emma.w@gmail.com', '1990-04-15'),
('mike_ross', 'L@wYer99!', 'mike.ross@gmail.com', '1988-07-22'),
('sarah_connor', 'Skyn3t!23', 'sarah.c@gmail.com', '2002-11-01'),
('peter_pan', 'Fl3sh!23$', 'p.pan@gmail.com', '2010-05-12'),
('jack_sparrow', 'S@il1ng#', 'jack.sparrow@gmail.com', '1985-02-25'),
('lara_croft', 'Exp1or3r$', 'lara.croft@gmail.com', '1993-07-15'),
('bruce_wayne', 'D@rkKn!ght7', 'bruce.wayne@gmail.com', '1980-09-05'),
('tony_stark', 'M@rk4!v3n', 'tony.stark@gmail.com', '1984-05-29'),
('diana_prince', 'Am@z0n!23', 'diana.prince@gmail.com', '1990-03-08');

-- Orders
INSERT INTO orders (user_id, total_price) VALUES
(1, 104.42),    -- Order 1  
(2, 187.90),    -- Order 2  
(3, 165.89),    -- Order 3  
(6, 115.46),    -- Order 4  
(4, 48.99),     -- Order 5  
(5, 114.48),    -- Order 6  
(7, 88.47),     -- Order 7  
(8, 48.15),     -- Order 8  
(3, 94.47),     -- Order 9  
(4, 79.88),     -- Order 10  
(2, 105.24),    -- Order 11 
(5, 57.48),     -- Order 12  
(1, 128.47),    -- Order 13 
(9, 47.49),     -- Order 14  
(12, 64.97),    -- Order 15  
(14, 42.98),    -- Order 16 
(5, 73.97),     -- Order 17  
(7, 37.49),     -- Order 18  
(10, 63.97),    -- Order 19  
(13, 47.49),    -- Order 20 
(11, 85.47),    -- Order 21 
(3, 54.50),     -- Order 22  
(6, 77.47),     -- Order 23  
(15, 51.98),    -- Order 24  
(4, 37.49),     -- Order 25 
(15, 70.96),    -- Order 26 
(9, 32.99),     -- Order 27  
(5, 68.49),     -- Order 28 
(12, 75.97),    -- Order 29 
(7, 52.50),     -- Order 30 
(14, 71.99),    -- Order 31 
(10, 23.99),    -- Order 32  
(13, 52.97),    -- Order 33 
(2, 37.00),     -- Order 34  
(8, 59.97);     -- Order 35 


-- Order Items
INSERT INTO order_items (order_id, book_id, quantity, price_at_purchase) VALUES
(1, 1, 2, 19.99),  -- 2x The Great Gatsby (discounted)
(1, 3, 1, 24.99),   -- 1x Master Chef Recipes (discounted)
(1, 14, 1, 24.50),   -- Sapiens: A Brief History of Humankind (discounted)
(1, 12, 1, 14.95),   -- The Art of War (full price)

(2, 2, 1, 39.99),   -- 1x Python for Beginners (full price)
(2, 10, 2, 29.99),  -- 2x The Lean Startup (discounted)
(2, 6, 2, 29.99),    -- Becoming (discounted)
(2, 5, 1, 27.95),    -- The Martian (full price)

(3, 5, 1, 27.95),   -- 1x The Martian (full price)
(3, 8, 3, 15.99),   -- 3x The Da Vinci Code (discounted)
(3, 10, 3, 29.99),   -- The Lean Startup (discounted)

(4, 7, 1, 28.50),   -- 1x Atomic Habits (full price)
(4, 4, 1, 24.99),   -- 1x The Hobbit (discounted)
(4, 6, 1, 29.99),   -- 1x Becoming (discounted)
(4, 11, 2, 15.99),   -- Pride and Prejudice (discounted)

(5, 11, 1, 15.99),  -- Pride and Prejudice (discounted)
(5, 20, 2, 16.50),  -- The Alchemist (discounted)

(6, 17, 1, 44.50),  -- Cracking the Coding Interview (discounted)
(6, 2, 1, 39.99),   -- Python for Beginners (full price)
(6, 10, 1, 29.99),  -- The Lean Startup (discounted)

(7, 18, 3, 19.99),  -- The Midnight Library (discounted)
(7, 7, 1, 28.50),   -- Atomic Habits (full price)

(8, 12, 2, 14.95),  -- The Art of War (full price)
(8, 19, 1, 18.25),  -- Good Omens (discounted)

(9, 1, 1, 19.99),   -- 1x The Great Gatsby (discounted)
(9, 4, 2, 24.99),   -- 2x The Hobbit (discounted)
(9, 14, 1, 24.50),  -- 1x Sapiens: A Brief History of Humankind (discounted)

(10, 10, 1, 29.99), -- 1x The Lean Startup (discounted)
(10, 12, 2, 14.95), -- 2x The Art of War (full price)
(10, 18, 1, 19.99), -- 1x The Midnight Library (discounted)

(11, 6, 1, 29.99),  -- 1x Becoming (discounted)
(11, 19, 1, 18.25), -- 1x Good Omens (discounted)
(11, 7, 2, 28.50),  -- 2x Atomic Habits (full price)

(12, 8, 1, 15.99),  -- 1x The Da Vinci Code (discounted)
(12, 20, 1, 16.50), -- 1x The Alchemist (discounted)
(12, 3, 1, 24.99),  -- 1x Master Chef Recipes (discounted)

(13, 17, 1, 44.50), -- 1x Cracking the Coding Interview (discounted)
(13, 2, 1, 39.99),  -- 1x Python for Beginners (full price)
(13, 15, 2, 21.99), -- 2x The Silent Patient (discounted)

(14, 21, 1, 24.99),  -- Dune (discounted)
(14, 50, 1, 22.50),  -- Hyperion (discounted)

(15, 31, 2, 19.99),  -- Girl with Dragon Tattoo (discounted)
(15, 46, 1, 24.99),  -- The Stand (discounted)

(16, 43, 1, 22.99),  -- Zero to One (discounted)
(16, 44, 1, 19.99),  -- Psychology of Money (discounted)

(17, 41, 3, 14.99),  -- Meditations (full price)
(17, 47, 2, 14.50),  -- Man’s Search (discounted)

(18, 45, 1, 18.50),  -- Inferno (discounted)
(18, 48, 1, 18.99),  -- Norwegian Wood (discounted)

(19, 49, 2, 21.99),  -- Fellowship (discounted)
(19, 42, 1, 19.99),  -- Name of Wind (discounted)

(20, 36, 1, 22.99),  -- Jurassic Park (full)
(20, 38, 1, 24.50),  -- It (full)

(21, 21, 1, 24.99),  -- Dune
(21, 35, 2, 18.99),  -- Witcher
(21, 50, 1, 22.50),  -- Hyperion

(22, 25, 1, 26.00),  -- Power of Habit (full)
(22, 7, 1, 28.50),   -- Atomic Habits (full)

(23, 30, 3, 19.99),  -- Rich Dad Poor Dad (full)
(23, 37, 1, 17.50),  -- Four Agreements (full)

(24, 34, 2, 25.99),  -- Brief History of Time (full)

(25, 23, 1, 18.50),  -- Catcher in Rye (full)
(25, 29, 1, 18.99),  -- To Kill Mockingbird (full)

(26, 22, 1, 19.99),  -- Brave New World (user 15)
(26, 39, 2, 15.99),   -- Dracula x2 (full price)
(26, 40, 1, 18.99),   -- Moby Dick

(27, 24, 1, 32.99),   -- Steve Jobs (user 9)

(28, 25, 1, 26.00),   -- Power of Habit (user 5)
(28, 32, 1, 20.50),    -- The Road
(28, 27, 1, 21.99),    -- The Shining

(29, 28, 2, 24.99),    -- 5 AM Club x2 (user 12)
(29, 34, 1, 25.99),    -- Brief History of Time

(30, 37, 3, 17.50),    -- Four Agreements x3 (user 7)

(31, 38, 2, 24.50),    -- It x2 (user 14)
(31, 36, 1, 22.99),    -- Jurassic Park

(32, 26, 1, 23.99),    -- Subtle Art (user 10)

(33, 33, 2, 16.99),    -- War of Art x2 (user 13)
(33, 29, 1, 18.99),    -- To Kill a Mockingbird

(34, 23, 2, 18.50),    -- Catcher in Rye x2 (user 2)

(35, 30, 3, 19.99);    -- Rich Dad Poor Dad x3 (user 8)

INSERT INTO reports (name, email, topic, message) VALUES
('admin', 'admin@gmail.com', 'Bug Report', 'Users are reporting that the checkout process fails when applying multiple discounts. Investigation required.'),
('admin', 'admin@gmail.com', 'Feature Suggestion', 'Consider adding a Save for Later feature in the shopping cart for better user convenience.'),
('admin', 'admin@gmail.com', 'Feedback', 'The website layout is not mobile-friendly on certain devices. Potential improvements are needed for better responsiveness.'),
('admin1', 'admin1@example.com', 'Sales Summary', 'Quarterly sales increased by 15%. Detailed report attached.'),
('admin2', 'admin2@example.com', 'Inventory Analysis', 'Stock levels for popular books are running low. Restock recommended.'),
('admin', 'admin@gmail.com', 'User Activity', 'User engagement rates are high during weekends. Consider adding weekend promotions.'),
('super_admin', 'super_admin@example.com', 'Financial Overview', 'Revenue projections indicate a stable growth for Q3.'),
('admin', 'admin@gmail.com', 'Bug Report', 'The discount code feature fails when multiple codes are applied simultaneously.'),
('admin2', 'admin2@example.com', 'Feature Suggestion', 'Introduce a wishlist feature to enhance user experience.'),
('admin1', 'admin1@example.com', 'Feedback', 'The mobile app performance has improved after the latest update.');