CREATE DATABASE IF NOT EXISTS todos_db;

CREATE TABLE IF NOT EXISTS todos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    completed BOOL DEFAULT FALSE
);