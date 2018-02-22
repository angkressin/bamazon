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
  console.log(color.green.bold("Welcome to Bamazon! Items are listed below:"));
  printStock()

});

var initQuestions = [{
    name: "id",
    type: "input",
    message: "please enter the id of the product you would like to purchase \n",
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
    message: "how many units of it would you like purchase? \n",
    validate: function validateNumber(value) {
      if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return true;
      }
      return 'Please enter numbers only';
    }
  }
]

function runQuestions() {
  inquirer
    .prompt(initQuestions).then(function(answer) {
      updateStock(answer);
    });
}

function printStock() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    runQuestions()
  });
};

function purchaseAgain() {
  inquirer
    .prompt({
      name: "newpurchase",
      type: "confirm",
      message: "Would you like to make another purchase?"
    })
    .then(function(answer) {
      if (answer.newpurchase) {
        runQuestions();
      } else {
        //end connection
        console.log(color.red.italic("closing session..."));
        connection.end();
      }
    });
}

function updateCount(answer) {
  connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [parseInt(answer.quantity), answer.id],
    function(err, res) {
      if (err) throw err;
      printUpdatedStock()
    }
  );
}

function printUpdatedStock() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(color.blue.bold("Below are the updated items:"));
    console.table(res);
    purchaseAgain()
  });
};

function updateStock(answer) {
  if (answer.quantity > 0) {
  connection.query("SELECT product_name, price, stock_quantity FROM products WHERE item_id = ?", [answer.id], function(err, res) {
    if (err) throw err;
    var result = res[0];
    if (answer.quantity > result.stock_quantity) {
      console.log(color.red.italic("Sorry insufficient quantity in stock. Please try another item \n"));
    printStock();
    } else {
      console.log(color.magenta.bold("====================================================== \n"))
      console.log(color.magenta.bold("Thank you! You've just purchased " + result.product_name + " for " + "$" + (result.price * answer.quantity) + "\n"));
      console.log(color.magenta.bold("====================================================== \n"))
      updateCount(answer);
    };
  })
} else {
  console.log(color.red.italic("Looks like you didn't make a purchase."))
  purchaseAgain();
}
};
