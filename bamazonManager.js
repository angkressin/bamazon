var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');
var color = require('cli-color');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(color.green.bold("Welcome to Bamazon Manager Portal! \n"));
  promptSelection()
});

function promptSelection() {
  inquirer
    .prompt([{
      type: 'list',
      name: 'options',
      message: 'What do you want to do?',
      choices: [
        'View products for sale',
        'View low inventory',
        'Add to inventory',
        'Add new product',
        'Exit',
      ]
    }]).then(function(answer) {
      switch (answer.options) {
        case "View products for sale":
          viewProducts();
          break;
        case "View low inventory":
          viewLowProducts();
          break;
        case "Add to inventory":
          addInventory();
          break;
        case "Add new product":
          addProducts();
          break;
        case "Exit":
          connection.end();
          break;
      };
    });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n")
    console.log(color.blue.bold("Here are products for sale"))
    console.table(res);
    console.log("\n")
    promptSelection();
  });
};

function viewLowProducts() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if (err) throw err;
    console.log("\n")
    console.log(color.blue.bold("Here are the items with stock quantity less than 5"))
    console.table(res);
    console.log("\n")
    promptSelection();
  });
};

function addInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n")
    console.log(color.blue.bold("Preview of the products"))
    console.table(res);
    promptAndUpdate();
  });
}

function promptAndUpdate() {
  inquirer
    .prompt([{
        name: "id",
        type: "input",
        message: "Please enter the item id of which you would like to add inventory \n",
        validate: function validateNumber(value) {
          if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return true;
          }
          return 'Please enter numbers only';
        }
      },
      {
        name: "amount",
        type: "input",
        message: "how many units of that item would you like to add? \n",
        validate: function validateNumber(value) {
          if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return true;
          }
          return 'Please enter numbers only';
        }
      }
    ]).then(function(answer) {
      connection.query("SELECT product_name FROM products WHERE item_id = ?", [answer.id], function(err, res) {
        if (err) throw err;
        console.log("\n");
        if (answer.amount > 1) {
          console.log(color.magenta.bold("You have successfully added " + answer.amount + " items to " + res[0].product_name));
        } else if (answer.amount < 1) {
          console.log(color.red.bold("Looks like you have not added anything to " + res[0].product_name));
        } else {
          console.log(color.magenta.bold("You have successfully added " + answer.amount + " item to " + res[0].product_name));
        }
        updateCount(answer);
      })
    })
};

function updateCount(answer) {
  connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [parseInt(answer.amount), answer.id],
    function(err, res) {
      if (err) throw err;
      printUpdatedStock();
    });
}

function printUpdatedStock() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n")
    console.log(color.blue.bold("Here are the updated products"))
    console.table(res);
    console.log("\n")
    promptSelection();
  });
}

function addProducts() {
  inquirer
    .prompt([{
        name: "product",
        type: "input",
        message: "Please enter the product name that you would like to add \n",
      },
      {
        name: "department",
        type: "input",
        message: "Please enter the department to which this product belongs \n",
      },
      {
        name: "price",
        type: "input",
        message: "Please enter the price for each item \n",
        validate: function validateNumber(value) {
          if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return true;
          }
          return 'Please enter numbers only';
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "Please enter the number of items you would like to stock \n",
        validate: function validateNumber(value) {
          if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return true;
          }
          return 'Please enter numbers only';
        }
      }
    ]).then(function(answer) {
      var itemToInsert = {
        product_name: answer.product,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.quantity
      }
      connection.query("INSERT INTO products SET ?", itemToInsert, function(err, res) {
        if (err) throw err;
        console.log("\n");
        console.log(color.magenta.bold("You have successfully added " + answer.quantity + " counts of " + answer.product + " to the stock."));
        printUpdatedStock();
      })
    })
};
