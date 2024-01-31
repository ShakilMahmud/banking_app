const readline = require('readline');

class Account {
  constructor(name, number, balance, accountType) {
    this.name = name;
    this.number = number;
    this.balance = balance;
    this.creationDate = new Date();
    this.accountType = accountType;
  }
}

class Bank {
  constructor() {
    this.accounts = [];
  }

  createAccount(name, number, balance, accountType) {
    let minBalance = 0;
    switch (accountType.toLowerCase()) {
      case "current":
        minBalance = 1000; // Minimum balance required for a current account
        break;
      case "savings":
        minBalance = 500; // Minimum balance required for a savings account
        break;
      case "salary":
        minBalance = 0; // No minimum balance required for a salary account
        break;
      default:
        console.log("Invalid account type.");
        return;
    }

    if (balance < minBalance) {
      console.log(`Minimum balance required for ${accountType} account is ${minBalance}.`);
      return;
    }

    const newAccount = new Account(name, number, balance, accountType);
    this.accounts.push(newAccount);
    console.log("Account created successfully.");
  }

  displayAllAccounts() {
    console.log("All Accounts:");
    this.accounts.forEach((account) => {
      console.log(`Name: ${account.name}, Number: ${account.number}, Balance: ${account.balance}, Type: ${account.accountType}`);
    });
  }

  updateAccount(number, newName) {
    const account = this.findAccount(number);
    if (account) {
      account.name = newName;
      console.log("Account updated successfully.");
    } else {
      console.log("Account not found.");
    }
  }

  deleteAccount(number) {
    const index = this.accounts.findIndex((account) => account.number === number);
    if (index !== -1) {
      this.accounts.splice(index, 1);
      console.log("Account deleted successfully.");
    } else {
      console.log("Account not found.");
    }
  }

  depositAmount(number, amount) {
    const account = this.findAccount(number);
    if (account) {
      account.balance += amount;
      console.log("Amount deposited successfully.");
    } else {
      console.log("Account not found.");
    }
  }

  withdrawAmount(number, amount) {
    const account = this.findAccount(number);
    if (account) {
      if (account.balance >= amount) {
        account.balance -= amount;
        console.log("Amount withdrawn successfully.");
      } else {
        console.log("Insufficient balance.");
      }
    } else {
      console.log("Account not found.");
    }
  }

  searchAccount(number) {
    const account = this.findAccount(number);
    if (account) {
      console.log(`Name: ${account.name}, Number: ${account.number}, Balance: ${account.balance}, Type: ${account.accountType}`);
    } else {
      console.log("Account not found.");
    }
  }

  findAccount(number) {
    return this.accounts.find((account) => account.number === number);
  }
}

const bank = new Bank();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function main() {
  console.log("\nBanking System Menu:");
  console.log("1. Create a new account");
  console.log("2. Display all accounts");
  console.log("3. Update an account");
  console.log("4. Delete an account");
  console.log("5. Deposit an amount into your account");
  console.log("6. Withdraw an amount from your account");
  console.log("7. Search for account");
  console.log("8. Exit");

  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter name: ", (name) => {
          rl.question("Enter account number: ", (number) => {
            rl.question("Enter initial balance: ", (balance) => {
              rl.question("Enter account type (current/savings/salary): ", (accountType) => {
                bank.createAccount(name, number, parseFloat(balance), accountType);
                main();
              });
            });
          });
        });
        break;
      case "2":
        bank.displayAllAccounts();
        main();
        break;
      case "3":
        rl.question("Enter account number to update: ", (number) => {
          rl.question("Enter new name: ", (newName) => {
            bank.updateAccount(number, newName);
            main();
          });
        });
        break;
      case "4":
        rl.question("Enter account number to delete: ", (number) => {
          bank.deleteAccount(number);
          main();
        });
        break;
      case "5":
        rl.question("Enter account number to deposit into: ", (number) => {
          rl.question("Enter amount to deposit: ", (amount) => {
            bank.depositAmount(number, parseFloat(amount));
            main();
          });
        });
        break;
      case "6":
        rl.question("Enter account number to withdraw from: ", (number) => {
          rl.question("Enter amount to withdraw: ", (amount) => {
            bank.withdrawAmount(number, parseFloat(amount));
            main();
          });
        });
        break;
      case "7":
        rl.question("Enter account number to search: ", (number) => {
          bank.searchAccount(number);
          main();
        });
        break;
      case "8":
        console.log("Exiting...");
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        main();
    }
  });
}

main();
