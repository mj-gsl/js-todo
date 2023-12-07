CREATE DATABASE IF NOT EXISTS todo_app;
CREATE USER IF NOT EXISTS 'todo_user'@'localhost' IDENTIFIED BY 'ToDoList2023!';
GRANT ALL PRIVILEGES ON todo_app.* TO 'todo_user'@'localhost';
FLUSH PRIVILEGES;

USE todo_app;

CREATE TABLE IF NOT EXISTS todos (
    No INT AUTO_INCREMENT PRIMARY KEY,
    Todoitem VARCHAR(255) NOT NULL,
    Status ENUM('open', 'in progress', 'finished') NOT NULL DEFAULT 'open'
);
