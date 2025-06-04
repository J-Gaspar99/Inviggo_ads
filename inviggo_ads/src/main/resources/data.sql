-- Insert korisnika
INSERT INTO users (id, username, password, registration_date, phone_number) VALUES
(1, 'john_doe', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '2024-01-01 10:00:00', '+381601234567'),
(2, 'jane_smith', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '2024-01-02 11:00:00', '+381602345678'),
(3, 'mike_wilson', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '2024-01-03 12:00:00', '+381603456789'),
(4, 'sarah_jones', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '2024-01-04 13:00:00', '+381604567890'),
(5, 'david_brown', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '2024-01-05 14:00:00', '+381605678901'),
(6, 'lisa_taylor', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '2024-01-06 15:00:00', '+381606789012'),
(7, 'peter_clark', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '2024-01-07 16:00:00', '+381607890123'),
(8, 'emma_white', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '2024-01-08 17:00:00', '+381608901234'),
(9, 'james_miller', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '2024-01-09 18:00:00', '+381609012345'),
(10, 'anna_harris', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '2024-01-10 19:00:00', '+381600123456');

-- Insert oglasa
-- Korisnik 1 (john_doe)
INSERT INTO ads (id, name, description, image_url, price, category, user_id, city, created_at, is_deleted) VALUES
(1, 'iPhone 13', 'Odlično očuvan iPhone 13, 128GB', 'http://example.com/iphone.jpg', 799.99, 'TECHNOLOGY', 1, 'Beograd', '2024-03-01 10:00:00', false),
(2, 'Kompjuter stolica', 'Ergonomska radna stolica, nova', 'http://example.com/chair.jpg', 199.99, 'FURNITURE', 1, 'Beograd', '2024-03-01 11:00:00', false),
(3, 'Nike patike', 'Nike Air Max, veličina 42', 'http://example.com/shoes.jpg', 89.99, 'CLOTHING', 1, 'Beograd', '2024-03-01 12:00:00', false),
(4, 'Mačka', 'Persijska mačka, 2 godine', 'http://example.com/cat.jpg', 200.00, 'PETS', 1, 'Beograd', '2024-03-01 13:00:00', false),
(5, 'PlayStation 5', 'PS5 sa 2 kontrolera', 'http://example.com/ps5.jpg', 499.99, 'GAMES', 1, 'Beograd', '2024-03-01 14:00:00', false),
(6, 'Knjiga "1984"', 'George Orwell, hardcover', 'http://example.com/book.jpg', 15.99, 'BOOKS', 1, 'Beograd', '2024-03-01 15:00:00', false),
(7, 'Bušilica', 'Bosch bušilica, nova', 'http://example.com/drill.jpg', 149.99, 'TOOLS', 1, 'Beograd', '2024-03-01 16:00:00', false),
(8, 'Fudbalska lopta', 'Adidas, profesionalna', 'http://example.com/ball.jpg', 29.99, 'SPORTS', 1, 'Beograd', '2024-03-01 17:00:00', false),
(9, 'Satovi', 'Casio, digitalni', 'http://example.com/watch.jpg', 49.99, 'ACCESSORIES', 1, 'Beograd', '2024-03-01 18:00:00', false),
(10, 'Sto za računar', 'Ikea, beli', 'http://example.com/desk.jpg', 89.99, 'FURNITURE', 1, 'Beograd', '2024-03-01 19:00:00', false);

-- Korisnik 2 (jane_smith)
INSERT INTO ads (id, name, description, image_url, price, category, user_id, city, created_at, is_deleted) VALUES
(11, 'MacBook Pro', 'M1, 16GB RAM', 'http://example.com/macbook.jpg', 1299.99, 'TECHNOLOGY', 2, 'Novi Sad', '2024-03-02 10:00:00', false),
(12, 'Trenerka', 'Adidas, kompletan set', 'http://example.com/tracksuit.jpg', 79.99, 'CLOTHING', 2, 'Novi Sad', '2024-03-02 11:00:00', false),
(13, 'Pas', 'Labrador, 1 godina', 'http://example.com/dog.jpg', 300.00, 'PETS', 2, 'Novi Sad', '2024-03-02 12:00:00', false),
(14, 'Xbox Series X', 'Sa 3 igre', 'http://example.com/xbox.jpg', 449.99, 'GAMES', 2, 'Novi Sad', '2024-03-02 13:00:00', false),
(15, 'Knjiga "Hobit"', 'J.R.R. Tolkien, hardcover', 'http://example.com/hobbit.jpg', 19.99, 'BOOKS', 2, 'Novi Sad', '2024-03-02 14:00:00', false),
(16, 'Kutija za alate', 'Stanley, 100 komada', 'http://example.com/tools.jpg', 199.99, 'TOOLS', 2, 'Novi Sad', '2024-03-02 15:00:00', false),
(17, 'Tenis reket', 'Wilson, profesionalni', 'http://example.com/tennis.jpg', 89.99, 'SPORTS', 2, 'Novi Sad', '2024-03-02 16:00:00', false),
(18, 'Naočare', 'Ray-Ban, sunčane', 'http://example.com/glasses.jpg', 129.99, 'ACCESSORIES', 2, 'Novi Sad', '2024-03-02 17:00:00', false),
(19, 'Kauč', 'Ikea, 3-seat', 'http://example.com/sofa.jpg', 299.99, 'FURNITURE', 2, 'Novi Sad', '2024-03-02 18:00:00', false),
(20, 'iPad Pro', '2023, 128GB', 'http://example.com/ipad.jpg', 899.99, 'TECHNOLOGY', 2, 'Novi Sad', '2024-03-02 19:00:00', false);

-- Korisnik 3 (mike_wilson)
INSERT INTO ads (id, name, description, image_url, price, category, user_id, city, created_at, is_deleted) VALUES
(21, 'Samsung TV', '55", 4K', 'http://example.com/tv.jpg', 699.99, 'TECHNOLOGY', 3, 'Niš', '2024-03-03 10:00:00', false),
(22, 'Jakna', 'Zimska jakna, veličina L', 'http://example.com/jacket.jpg', 129.99, 'CLOTHING', 3, 'Niš', '2024-03-03 11:00:00', false),
(23, 'Zec', 'Holandski patuljasti, 6 meseci', 'http://example.com/rabbit.jpg', 50.00, 'PETS', 3, 'Niš', '2024-03-03 12:00:00', false),
(24, 'Nintendo Switch', 'Sa Mario Kart', 'http://example.com/switch.jpg', 299.99, 'GAMES', 3, 'Niš', '2024-03-03 13:00:00', false),
(25, 'Knjiga "Gospodar prstenova"', 'J.R.R. Tolkien, box set', 'http://example.com/lotr.jpg', 39.99, 'BOOKS', 3, 'Niš', '2024-03-03 14:00:00', false),
(26, 'Čekić', 'Stanley, 2kg', 'http://example.com/hammer.jpg', 29.99, 'TOOLS', 3, 'Niš', '2024-03-03 15:00:00', false),
(27, 'Košarkaška lopta', 'Spalding, profesionalna', 'http://example.com/basketball.jpg', 39.99, 'SPORTS', 3, 'Niš', '2024-03-03 16:00:00', false),
(28, 'Torba', 'Herschel, laptop', 'http://example.com/bag.jpg', 89.99, 'ACCESSORIES', 3, 'Niš', '2024-03-03 17:00:00', false),
(29, 'Polica', 'Ikea, bela', 'http://example.com/shelf.jpg', 49.99, 'FURNITURE', 3, 'Niš', '2024-03-03 18:00:00', false),
(30, 'AirPods Pro', '2. generacija', 'http://example.com/airpods.jpg', 249.99, 'TECHNOLOGY', 3, 'Niš', '2024-03-03 19:00:00', false);

-- Korisnik 4 (sarah_jones)
INSERT INTO ads (id, name, description, image_url, price, category, user_id, city, created_at, is_deleted) VALUES
(31, 'Google Pixel 7', '128GB, crni', 'http://example.com/pixel.jpg', 599.99, 'TECHNOLOGY', 4, 'Kragujevac', '2024-03-04 10:00:00', false),
(32, 'Haljina', 'Letnja, veličina M', 'http://example.com/dress.jpg', 59.99, 'CLOTHING', 4, 'Kragujevac', '2024-03-04 11:00:00', false),
(33, 'Papagaj', 'Ara, 3 godine', 'http://example.com/parrot.jpg', 400.00, 'PETS', 4, 'Kragujevac', '2024-03-04 12:00:00', false),
(34, 'PC igra "Cyberpunk"', 'Steam key', 'http://example.com/cyberpunk.jpg', 29.99, 'GAMES', 4, 'Kragujevac', '2024-03-04 13:00:00', false),
(35, 'Knjiga "Dune"', 'Frank Herbert, hardcover', 'http://example.com/dune.jpg', 24.99, 'BOOKS', 4, 'Kragujevac', '2024-03-04 14:00:00', false),
(36, 'Šrafciger', 'Set od 10 komada', 'http://example.com/screwdriver.jpg', 19.99, 'TOOLS', 4, 'Kragujevac', '2024-03-04 15:00:00', false),
(37, 'Roleri', 'K2, profesionalni', 'http://example.com/rollers.jpg', 79.99, 'SPORTS', 4, 'Kragujevac', '2024-03-04 16:00:00', false),
(38, 'Narukvica', 'Srebrna, handmade', 'http://example.com/bracelet.jpg', 39.99, 'ACCESSORIES', 4, 'Kragujevac', '2024-03-04 17:00:00', false),
(39, 'Stolica', 'Ikea, crna', 'http://example.com/chair2.jpg', 69.99, 'FURNITURE', 4, 'Kragujevac', '2024-03-04 18:00:00', false),
(40, 'Kindle', 'Paperwhite, 2023', 'http://example.com/kindle.jpg', 149.99, 'TECHNOLOGY', 4, 'Kragujevac', '2024-03-04 19:00:00', false);

-- Korisnik 5 (david_brown)
INSERT INTO ads (id, name, description, image_url, price, category, user_id, city, created_at, is_deleted) VALUES
(41, 'Dell XPS 13', 'i7, 16GB RAM', 'http://example.com/dell.jpg', 1199.99, 'TECHNOLOGY', 5, 'Subotica', '2024-03-05 10:00:00', false),
(42, 'Košulja', 'Business, veličina XL', 'http://example.com/shirt.jpg', 49.99, 'CLOTHING', 5, 'Subotica', '2024-03-05 11:00:00', false),
(43, 'Akvarijum', '100L, sa opremom', 'http://example.com/aquarium.jpg', 150.00, 'PETS', 5, 'Subotica', '2024-03-05 12:00:00', false),
(44, 'Board game "Catan"', 'Nova verzija', 'http://example.com/catan.jpg', 39.99, 'GAMES', 5, 'Subotica', '2024-03-05 13:00:00', false),
(45, 'Knjiga "Alhemičar"', 'Paulo Coelho', 'http://example.com/alchemist.jpg', 12.99, 'BOOKS', 5, 'Subotica', '2024-03-05 14:00:00', false),
(46, 'Merdevine', '3m, aluminijumske', 'http://example.com/ladder.jpg', 89.99, 'TOOLS', 5, 'Subotica', '2024-03-05 15:00:00', false),
(47, 'Stoni tenis', 'Set sa 2 reketom', 'http://example.com/pingpong.jpg', 49.99, 'SPORTS', 5, 'Subotica', '2024-03-05 16:00:00', false),
(48, 'Ranac', 'North Face, 30L', 'http://example.com/backpack.jpg', 99.99, 'ACCESSORIES', 5, 'Subotica', '2024-03-05 17:00:00', false),
(49, 'Krevet', '160x200, sa madracem', 'http://example.com/bed.jpg', 399.99, 'FURNITURE', 5, 'Subotica', '2024-03-05 18:00:00', false),
(50, 'Sony WH-1000XM4', 'Bežične slušalice', 'http://example.com/sony.jpg', 299.99, 'TECHNOLOGY', 5, 'Subotica', '2024-03-05 19:00:00', false);

-- Korisnik 6 (lisa_taylor)
INSERT INTO ads (id, name, description, image_url, price, category, user_id, city, created_at, is_deleted) VALUES
(51, 'Canon EOS R6', 'Sa objektivom', 'http://example.com/canon.jpg', 1999.99, 'TECHNOLOGY', 6, 'Beograd', '2024-03-06 10:00:00', false),
(52, 'Cipele', 'Visoke, crne', 'http://example.com/boots.jpg', 129.99, 'CLOTHING', 6, 'Beograd', '2024-03-06 11:00:00', false),
(53, 'Hrčak', 'Sirijski, 1 godina', 'http://example.com/hamster.jpg', 20.00, 'PETS', 6, 'Beograd', '2024-03-06 12:00:00', false),
(54, 'Magic: The Gathering', 'Starter set', 'http://example.com/mtg.jpg', 29.99, 'GAMES', 6, 'Beograd', '2024-03-06 13:00:00', false),
(55, 'Knjiga "Mali princ"', 'Antoine de Saint-Exupéry', 'http://example.com/prince.jpg', 9.99, 'BOOKS', 6, 'Beograd', '2024-03-06 14:00:00', false),
(56, 'Set ključeva', '10 komada', 'http://example.com/keys.jpg', 24.99, 'TOOLS', 6, 'Beograd', '2024-03-06 15:00:00', false),
(57, 'Joga mat', 'Premium, 6mm', 'http://example.com/yoga.jpg', 29.99, 'SPORTS', 6, 'Beograd', '2024-03-06 16:00:00', false),
(58, 'Šal', 'Vuneni, handmade', 'http://example.com/scarf.jpg', 34.99, 'ACCESSORIES', 6, 'Beograd', '2024-03-06 17:00:00', false),
(59, 'Stol za kafu', 'Drveni, okrugli', 'http://example.com/coffee.jpg', 79.99, 'FURNITURE', 6, 'Beograd', '2024-03-06 18:00:00', false),
(60, 'GoPro Hero 10', 'Sa dodatnom baterijom', 'http://example.com/gopro.jpg', 399.99, 'TECHNOLOGY', 6, 'Beograd', '2024-03-06 19:00:00', false);

-- Korisnik 7 (peter_clark)
INSERT INTO ads (id, name, description, image_url, price, category, user_id, city, created_at, is_deleted) VALUES
(61, 'LG Monitor', '27", 4K', 'http://example.com/monitor.jpg', 399.99, 'TECHNOLOGY', 7, 'Novi Sad', '2024-03-07 10:00:00', false),
(62, 'Pantalone', 'Jeans, slim fit', 'http://example.com/jeans.jpg', 69.99, 'CLOTHING', 7, 'Novi Sad', '2024-03-07 11:00:00', false),
(63, 'Ribe', 'Tetra, 5 komada', 'http://example.com/fish.jpg', 15.00, 'PETS', 7, 'Novi Sad', '2024-03-07 12:00:00', false),
(64, 'Dungeons & Dragons', 'Starter set', 'http://example.com/dnd.jpg', 49.99, 'GAMES', 7, 'Novi Sad', '2024-03-07 13:00:00', false),
(65, 'Knjiga "Medicinski fakultet"', 'Učebnik', 'http://example.com/med.jpg', 89.99, 'BOOKS', 7, 'Novi Sad', '2024-03-07 14:00:00', false),
(66, 'Merni instrumenti', 'Set od 5 komada', 'http://example.com/measure.jpg', 39.99, 'TOOLS', 7, 'Novi Sad', '2024-03-07 15:00:00', false),
(67, 'Bicikl', 'MTB, 21 brzina', 'http://example.com/bike.jpg', 299.99, 'SPORTS', 7, 'Novi Sad', '2024-03-07 16:00:00', false),
(68, 'Novčanik', 'Kožni, sa više odeljaka', 'http://example.com/wallet.jpg', 44.99, 'ACCESSORIES', 7, 'Novi Sad', '2024-03-07 17:00:00', false),
(69, 'Orman', 'Ikea, 3 vrata', 'http://example.com/wardrobe.jpg', 199.99, 'FURNITURE', 7, 'Novi Sad', '2024-03-07 18:00:00', false),
(70, 'DJI Mini 3', 'Dron sa kontrolerom', 'http://example.com/drone.jpg', 499.99, 'TECHNOLOGY', 7, 'Novi Sad', '2024-03-07 19:00:00', false);

-- Korisnik 8 (emma_white)
INSERT INTO ads (id, name, description, image_url, price, category, user_id, city, created_at, is_deleted) VALUES
(71, 'Sony A7III', 'Sa objektivom 24-70mm', 'http://example.com/sony.jpg', 1999.99, 'TECHNOLOGY', 8, 'Niš', '2024-03-08 10:00:00', false),
(72, 'Suknja', 'Letnja, floral', 'http://example.com/skirt.jpg', 39.99, 'CLOTHING', 8, 'Niš', '2024-03-08 11:00:00', false),
(73, 'Kornjača', 'Vodena, sa terarijumom', 'http://example.com/turtle.jpg', 80.00, 'PETS', 8, 'Niš', '2024-03-08 12:00:00', false),
(74, 'Carcassonne', 'Board game', 'http://example.com/carcassonne.jpg', 34.99, 'GAMES', 8, 'Niš', '2024-03-08 13:00:00', false),
(75, 'Knjiga "Kuhinja"', 'Recepti', 'http://example.com/cookbook.jpg', 29.99, 'BOOKS', 8, 'Niš', '2024-03-08 14:00:00', false),
(76, 'Set za vrt', '5 komada', 'http://example.com/garden.jpg', 49.99, 'TOOLS', 8, 'Niš', '2024-03-08 15:00:00', false),
(77, 'Roleri', 'Za fitness', 'http://example.com/roller.jpg', 19.99, 'SPORTS', 8, 'Niš', '2024-03-08 16:00:00', false),
(78, 'Prsten', 'Srebrni, sa kamenom', 'http://example.com/ring.jpg', 79.99, 'ACCESSORIES', 8, 'Niš', '2024-03-08 17:00:00', false),
(79, 'Stol za trpezariju', 'Drveni, 6 stolica', 'http://example.com/table.jpg', 299.99, 'FURNITURE', 8, 'Niš', '2024-03-08 18:00:00', false),
(80, 'iPad Air', '2022, 64GB', 'http://example.com/ipad.jpg', 599.99, 'TECHNOLOGY', 8, 'Niš', '2024-03-08 19:00:00', false);

-- Korisnik 9 (james_miller)
INSERT INTO ads (id, name, description, image_url, price, category, user_id, city, created_at, is_deleted) VALUES
(81, 'Asus ROG', 'Gaming laptop', 'http://example.com/asus.jpg', 1499.99, 'TECHNOLOGY', 9, 'Kragujevac', '2024-03-09 10:00:00', false),
(82, 'Kaput', 'Zimski, veličina L', 'http://example.com/coat.jpg', 199.99, 'CLOTHING', 9, 'Kragujevac', '2024-03-09 11:00:00', false),
(83, 'Morsko prase', 'Sa kavezom', 'http://example.com/guinea.jpg', 40.00, 'PETS', 9, 'Kragujevac', '2024-03-09 12:00:00', false),
(84, 'Risk', 'Board game', 'http://example.com/risk.jpg', 29.99, 'GAMES', 9, 'Kragujevac', '2024-03-09 13:00:00', false),
(85, 'Knjiga "Programiranje"', 'Java za početnike', 'http://example.com/java.jpg', 49.99, 'BOOKS', 9, 'Kragujevac', '2024-03-09 14:00:00', false),
(86, 'Električna bušilica', 'Bosch, sa setom svrdla', 'http://example.com/drill.jpg', 129.99, 'TOOLS', 9, 'Kragujevac', '2024-03-09 15:00:00', false),
(87, 'Stoni fudbal', 'Profesionalni', 'http://example.com/foosball.jpg', 199.99, 'SPORTS', 9, 'Kragujevac', '2024-03-09 16:00:00', false),
(88, 'Kaiš', 'Kožni, sa kopčom', 'http://example.com/belt.jpg', 29.99, 'ACCESSORIES', 9, 'Kragujevac', '2024-03-09 17:00:00', false),
(89, 'Krevetac', 'Za goste', 'http://example.com/futon.jpg', 149.99, 'FURNITURE', 9, 'Kragujevac', '2024-03-09 18:00:00', false),
(90, 'Samsung Watch', 'Galaxy Watch 5', 'http://example.com/watch.jpg', 299.99, 'TECHNOLOGY', 9, 'Kragujevac', '2024-03-09 19:00:00', false);

-- Korisnik 10 (anna_harris)
INSERT INTO ads (id, name, description, image_url, price, category, user_id, city, created_at, is_deleted) VALUES
(91, 'Microsoft Surface', 'Pro 8, i7', 'http://example.com/surface.jpg', 1299.99, 'TECHNOLOGY', 10, 'Subotica', '2024-03-10 10:00:00', false),
(92, 'Trenerka', 'Nike, set', 'http://example.com/tracksuit.jpg', 89.99, 'CLOTHING', 10, 'Subotica', '2024-03-10 11:00:00', false),
(93, 'Kornjača', 'Kopnena, sa terarijumom', 'http://example.com/turtle.jpg', 60.00, 'PETS', 10, 'Subotica', '2024-03-10 12:00:00', false),
(94, 'Monopoly', 'Nova verzija', 'http://example.com/monopoly.jpg', 39.99, 'GAMES', 10, 'Subotica', '2024-03-10 13:00:00', false),
(95, 'Knjiga "Psihologija"', 'Učebnik', 'http://example.com/psych.jpg', 59.99, 'BOOKS', 10, 'Subotica', '2024-03-10 14:00:00', false),
(96, 'Set za popravku', 'Auto alati', 'http://example.com/car.jpg', 79.99, 'TOOLS', 10, 'Subotica', '2024-03-10 15:00:00', false),
(97, 'Joga set', 'Mat + blokovi', 'http://example.com/yoga.jpg', 49.99, 'SPORTS', 10, 'Subotica', '2024-03-10 16:00:00', false),
(98, 'Nakit', 'Set od 3 komada', 'http://example.com/jewelry.jpg', 69.99, 'ACCESSORIES', 10, 'Subotica', '2024-03-10 17:00:00', false),
(99, 'Polica', 'Za knjige', 'http://example.com/bookshelf.jpg', 89.99, 'FURNITURE', 10, 'Subotica', '2024-03-10 18:00:00', false),
(100, 'Bose QC45', 'Bežične slušalice', 'http://example.com/bose.jpg', 299.99, 'TECHNOLOGY', 10, 'Subotica', '2024-03-10 19:00:00', false);