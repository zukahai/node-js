CREATE TABLE `users` (
                         `id` int(10) NOT NULL,
                         `firstName` varchar(255) NOT NULL,
                         `lastName` varchar(255) NOT NULL,
                         `email` varchar(255) NOT NULL,
                         `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);


ALTER TABLE `users`
    MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;