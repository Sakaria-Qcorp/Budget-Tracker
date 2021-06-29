let db;


const request = indexedDB.open('BudgetDB', 1);

request.onupgradeneeded = function (event) {

  db = event.target.result;
  db.createObjectStore('budgetStore', { autoIncrement: true });

};

request.onerror = function (event) {
  console.log(event.target.errorCode);
};

function checkDatabase() {
  console.log('....checking database');

  let transaction = db.transaction(['budgetStore'], 'readwrite');

  const budgetStore = transaction.objectStore('budgetStore');

  
  const allData = budgetStore.getAll();

  
  allData.onsuccess = function () {
  
    if (allData.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(allData.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
      
          if (data.length !== 0) {
           
            transaction = db.transaction(['budgetStore'], 'readwrite');

        
            const newStore = transaction.objectStore('budgetStore');

            
            newStore.clear();
            console.log("Clear");
          }
        });
    }
  };
}

request.onsuccess = function (event) {
  console.log('It worked!!');
  db = event.target.result;

  
  if (navigator.onLine) {
    console.log("online");
    checkDatabase();
  }
};

const saveRecord = (data) => {
  console.log("record seved");
 
  const transaction = db.transaction(['budgetStore'], 'readwrite');

 
  const newestStore = transaction.objectStore('budgetStore');

  newestStore.add(data);
};


window.addEventListener('online', checkDatabase);

