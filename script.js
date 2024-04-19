const transactionTable = document.querySelector('#transaction-table tbody');
const transactionForm = document.querySelector('#transaction-form');
const descriptionInput = document.querySelector('#description-input');
const amountInput = document.querySelector('#amount-input');
let transactions = [];
let balance = 0;
transactionForm.addEventListener('submit', (event) => {
   event.preventDefault(); // Prevent form submission
   const description = descriptionInput.value;
   const amount = Number(amountInput.value);
   if (description && amount) {
       const transaction = new Map();
       transaction.set('date', new Date().toLocaleDateString());
       transaction.set('description', description);
       if (amount < 0) {
           transaction.set('withdrawal', Math.abs(amount));
           transaction.set('deposit', '');
           balance -= Math.abs(amount);
       } else {
           transaction.set('withdrawal', '');
           transaction.set('deposit', amount);
           balance += amount;
       }
       transaction.set('balance', balance);
       transactions.push(transaction);
       updateTable();
       descriptionInput.value = '';
       amountInput.value = '';
   }
});
function updateTable() {
   transactionTable.innerHTML = ''; // Clear table rows
   const uniqueTransactions = Array.from(new Set(transactions)); // Remove duplicates
   uniqueTransactions.slice(-5).forEach((transaction) => {
       const row = document.createElement('tr');
       transaction.forEach((value) => {
           const cell = document.createElement('td');
           cell.textContent = value;
           row.appendChild(cell);
       });
       transactionTable.appendChild(row);
   });
}