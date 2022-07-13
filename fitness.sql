-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 13 Lip 2022, 23:03
-- Wersja serwera: 10.4.17-MariaDB
-- Wersja PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `fitness`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `activities_users`
--

CREATE TABLE `activities_users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activityName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activityDate` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activityStartTime` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activityDuration` smallint(5) UNSIGNED NOT NULL,
  `activityDistance` smallint(5) UNSIGNED DEFAULT NULL,
  `activitySpeed` tinyint(3) UNSIGNED DEFAULT NULL,
  `activityComment` varchar(75) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `activities_users`
--

INSERT INTO `activities_users` (`id`, `userId`, `activityName`, `activityDate`, `activityStartTime`, `activityDuration`, `activityDistance`, `activitySpeed`, `activityComment`) VALUES
('93f90987-7b34-4db5-8fd5-fb15db3e8863', '944da956-ad0e-46a4-ba65-19f04085a145', 'Run', '2022-07-18', '00:55', 40, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `activity_types`
--

CREATE TABLE `activity_types` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `activity_types`
--

INSERT INTO `activity_types` (`id`, `name`) VALUES
('087cb2d8-fb1b-11ec-8880-30e171823d53', 'Bike Ride'),
('1dc4d9c1-fb1b-11ec-8880-30e171823d53', 'Gym Workout'),
('e033bb9b-fb1a-11ec-8880-30e171823d53', 'Run'),
('eb40989f-fb1a-11ec-8880-30e171823d53', 'Swim'),
('f95df894-fb1a-11ec-8880-30e171823d53', 'Walk');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_data`
--

CREATE TABLE `users_data` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `firstName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ivHex` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `users_data`
--

INSERT INTO `users_data` (`id`, `firstName`, `lastName`, `email`, `password`, `ivHex`) VALUES
('944da956-ad0e-46a4-ba65-19f04085a145', 'test', 'test', 'test@wp.pl', 'f1c0aa572b94dc1e3e09a18f23359748', '0038600d2b6471447772dd6ca0ed42a3');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `activities_users`
--
ALTER TABLE `activities_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeksy dla tabeli `activity_types`
--
ALTER TABLE `activity_types`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users_data`
--
ALTER TABLE `users_data`
  ADD PRIMARY KEY (`id`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `activities_users`
--
ALTER TABLE `activities_users`
  ADD CONSTRAINT `FK1_activities_users_users_data` FOREIGN KEY (`userId`) REFERENCES `users_data` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
