INSERT INTO users (name, radius_pref, pages_max_pref, pages_min_pref, maturity_pref, age_max_pref, age_min_pref, price_max_pref)
VALUES ('Sandra Gardiner', 50, 350, 50, true, 150, 1, 45);

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

