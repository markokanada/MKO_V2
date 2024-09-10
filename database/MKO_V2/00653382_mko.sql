-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Gép: mysql57
-- Létrehozás ideje: 2023. Jún 02. 21:04
-- Kiszolgáló verziója: 5.7.39-42
-- PHP verzió: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `00653382_mko`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `books`
--

CREATE TABLE `books` (
  `username` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `ido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cim` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `szerzo` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `kiado` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `megjelenes` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `kep` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `books`
--

INSERT INTO `books` (`username`, `ido`, `cim`, `szerzo`, `kiado`, `megjelenes`, `kep`, `id`) VALUES
('', '2023-05-09 14:36:29', '', '', '', '', '', 1),
('', '2023-05-09 14:38:21', '', '', '', '', '', 2),
('', '2023-05-09 14:38:45', '', '', '', '', '', 3),
('', '2023-05-09 14:38:52', '', '', '', '', '', 4),
('', '2023-05-09 14:42:56', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 5),
('', '2023-05-09 15:00:39', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 6),
('', '2023-05-09 15:02:15', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 7),
('admin', '2023-05-09 15:02:38', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 8),
('admin', '2023-05-09 17:15:09', '', '', '', '', '', 9),
('admin', '2023-05-09 17:15:44', '', '', '', '', '', 10),
('admin', '2023-05-09 17:16:42', '', '', '', '', '', 11),
('admin', '2023-05-09 17:17:59', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 12),
('admin', '2023-05-09 17:18:39', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 13),
('admin', '2023-05-09 17:19:23', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 14),
('admin', '2023-05-09 17:20:13', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 15),
('admin', '2023-05-09 17:20:25', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 16),
('admin', '2023-05-09 17:20:48', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 17),
('admin', '2023-05-09 17:23:58', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 18),
('admin', '2023-05-09 17:24:41', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 19),
('admin', '2023-05-09 17:24:44', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 20),
('admin', '2023-05-09 17:24:48', 'Rent-A-Girlfriend 1', 'Reiji Miyajima', 'National Geographic Books', '2020-06-02', 'http://books.google.com/books/content?id=fZGQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 21),
('admin', '2023-05-09 18:34:21', 'CsontvĂĄros', 'Cassandra Clare', '-', '', 'https://i.imgur.com/8BiJOUZ.jpg', 22),
('admin', '2023-05-09 18:40:57', 'CsontvĂĄros', 'Cassandra Clare', '', '', 'https://i.imgur.com/17PrU7g.jpg', 23);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stars`
--

CREATE TABLE `stars` (
  `id` bigint(20) NOT NULL,
  `data` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

--
-- A tábla adatainak kiíratása `stars`
--

INSERT INTO `stars` (`id`, `data`, `date`) VALUES
(6458, 5, '2023-05-08'),
(6458, 5, '2023-05-08'),
(6458, 5, '2023-05-08'),
(6458, 5, '2023-05-08'),
(6458, 5, '2023-05-08'),
(6458, 5, '2023-05-08'),
(645, 5, '2023-05-10');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `tipus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`username`, `email`, `jelszo`, `tipus`) VALUES
('', '', '$2y$10$mwXCX9dj0ju2d9D4pxX5EuwpM.IcYa929pkbgrmF2cOfHadXOiGku', 0),
('admin', 'markokanadateam2@gmail.com', '$2y$10$NNWZT44Tk9BM7d5kpwpqd.xgLqwWbKHEXJXH/f8LRjr5l3jRwBUaa', 0),
('', '', '$2y$10$2z1b9sYbq/6..rKbLzpGsOeJCVz9ieqTFvKlaeiv5PxQgnidAfsSe', 0),
('admin3', 'markokanadateam3@gmail.com', '$2y$10$y0nEv/cedq4XqOSebO/TfeAzYNikvAVkSAYiAglYVUmKwDwKu72Xq', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
