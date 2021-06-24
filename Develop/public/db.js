let db;

// creating a new DB request
const request = window.open("BudgetDB", 1);

request.onupgradeneeded = function( event ) {
   db = event.target.result;
   //creating the object store
   const budgetStore = db.createObjectStore("budgetStore", {autoIncrement: true});

};