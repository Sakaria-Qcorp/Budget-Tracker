let db;

// creating a new DB request
const request = window.open("BudgetDB", 1);

request.onupgradeneeded = function( event ) {
   db = event.target.result;
   //creating the object store
   const budgetStore = db.createObjectStore("budgetStore", {autoIncrement: true});

};

request.onsuccess = function(event) {
db = event.target.result;
if (navigator.onLine) {
    checkData();
  }

};

function saveRecord(data){
    
const transaction = db.transaction(["budgetStore"], "readwrite");
const budgetStore = transaction.objectStore("budgetStore"); 
budgetStore.add(data);

}
function checkData(data){
    const transaction = db.transaction(["budgetStore"], "readwrite");
    const budgetStore = transaction.objectStore("budgetStore");
    const getAll = budgetStore.getAll();
}