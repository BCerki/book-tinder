INSERT INTO users (name, age, page_count, price, max_distance, maturity, genres, postal_code)
VALUES ('Don Juan', ARRAY[20, 40], ARRAY[256, 512], ARRAY[10, 30], 80, false, ARRAY['Mystery', 'Romance', 'Literary', 'Science Fiction', 'Fantasy', 'Children''s', 'Non-fiction', 'History', 'Biography/Memoir', 'Cooking', 'Humour', 'Self-help'], 'V6B5A1');


-- INSERT INTO block_user (users_id, books_id)
-- VALUES (1, 1);

INSERT INTO genres (name)
VALUES('Mystery'),
('Romance'),
('Literary'),
('Young Adult'),
('Biography/Memoir'),
('Historical Fiction'),
('Classics'),
('Fiction'),
('Science Fiction'),
('Fantasy'),
('Children''s'),
('Non-fiction'),
('History'),
('Cooking'),
('Humour'),
('Self-help');




INSERT INTO genre_user (users_id, genres_id)
VALUES (1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);



