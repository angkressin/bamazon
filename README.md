# Bamazon
Basic Amazon-like storefront using node.js and MySQL

## Description
Bamazon is a Node.js and MySQL storefront application using CLI. This application pull data from the MySQL database and can allow customers and managers to interact with the data. Running the bamazonCustomer.js file in node will let customers purchase items and the bamazonManager.js file gives managers the ability to view all items in stock, view low inventory, add stock, and add new products to the database. 

## Getting Started
You will need:
* Terminal (MacOS) or Console (Windows) to run the commands
* Install these npm packages (also listed in package.json): 
  * mysql
  * inquirer
  * console.table
  * cli-color

## How to Use
* Clone this github repository to your machine (make sure the stock.csv file is included)
* Run the bamazon.sql file in a MySQL database management application such as Sequel Pro or MySQLWorkbench
* Import the stock.csv file into Sequel Pro or SQL Workbench to insert the data. Be sure to ignore the item_id field so it can dynamically create ids. 
* Run the bamazonCustomer.js or bamazonManager.js file in node
* You will be prompted with questions specific for the user profile
  * [Watch the video demonstration for customer view >>](https://drive.google.com/file/d/1jYQDZSG_bc1pju9cr07J4fD-230Wb7_0/view)
  * [Watch the video demonstration for manager view >>](https://drive.google.com/open?id=1iI5zQQUq2KpHjUiOPoT5OpxF6sQMdpCl)
  
## Authors
Angela Kressin
