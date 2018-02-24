# Bamazon
Basic Amazon-like storefront using node.js and MySQL

## Description
Bamazon is a Node.js and MySQL storefront application using CLI. This application allows customers to purchase items listed and will directly update the MySQL database. 

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
* Run the bamazonCustomer.js file in node
* You will be prompted with questions for the purchase
  * [Watch the video demonstration >>](https://drive.google.com/file/d/1jYQDZSG_bc1pju9cr07J4fD-230Wb7_0/view)
  
## Authors
Angela Kressin
