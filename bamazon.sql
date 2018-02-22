DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INT(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(70),
price DECIMAL(11,2),
stock_quantity INT(11),
PRIMARY KEY (item_id)
);

SELECT * FROM products;
