INSERT INTO users (name, age, page_count, price, max_distance, maturity, genres)
VALUES ('Sandra Gardiner', ARRAY[20, 40], ARRAY[256, 512], ARRAY[10, 30], 80, false, ARRAY['Mystery', 'Romance', 'Young Adult', 'Fiction', 'Science Fiction']);


INSERT INTO block_user (users_id, books_id)
VALUES (1, 1);

INSERT INTO genres (name)
VALUES('Mystery'),
('Romance'),
('Young Adult'),
('Biography'),
('Historical Fiction'),
('Classics'),
('Fiction'),
('Science Fiction');

INSERT INTO genre_user (users_id, genres_id)
VALUES (1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);

INSERT INTO conversations (user_id, book_id)
VALUES (1, 1),
(1, 2),
(1, 3),
(1, 4);

