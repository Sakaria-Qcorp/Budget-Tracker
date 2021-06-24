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

};

function saveRecord(data){
    
const transaction = db.transaction(["budgetStore"], "readwrite");
const budgetStore = transaction.objectStore("budgetStore"); 

}
function checkData(data){
    const transaction = db.transaction(["budgetStore"], "readwrite");
    const budgetStore = transaction.objectStore("budgetStore");
    const getAll = budgetStore.getAll();
}