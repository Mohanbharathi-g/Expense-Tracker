'use strict';

// creating elements

const formEl = document.getElementById('form');

const listEl = document.getElementById('list-container');

const transactionEl = document.getElementById('transaction');

const amountEl = document.getElementById('amount');

const balanceEl = document.getElementById('balance');

const incomeEl = document.getElementById('income');

const expenseEl = document.getElementById('expense');

const btnForm = document.getElementById('button');

// global variables
let transactions = [];
let isEditing = false;
let editId = null;
listEl.innerHTML = null;

let income = 0;
let expense = 0;
let balance = 0;

// functions
function init() {
  listEl.innerHTML = null;
  isEditing = false;
  editId = null;
  btnForm.innerText = `add transaction`;
  transactions.forEach((transaction) => {
    addTransactionToDom(transaction);
  });

  updateValue();
}

// display UI
function addTransactionToDom({ id, title, amount }) {
  const liEl = document.createElement('li');

  liEl.className = amount > 0 ? 'plus' : 'minus';
  liEl.innerHTML = `<span>${title}</span> <span>₹ ${amount}</span>
            <button class="btn update-btn" onclick=updateItem(${id}) >
              <i class="fa-sharp fa-solid fa-pen"></i>
            </button>
            <button class="btn delete-btn" onclick=deleteItem(${id})>
              <i class="fa-sharp fa-solid fa-xmark"></i>
            </button>`;

  listEl.appendChild(liEl);
}

// delete function
function deleteItem(id) {
  init();
  transactions = transactions.filter((transaction) => transaction.id !== id);
  // calling initial settings

  // readd the list elements
  init();
}

// edit function

function updateItem(id) {
  // change the isEditing value as true
  isEditing = true;
  console.log(isEditing);
  // change the button name
  btnForm.innerText = `edit transaction`;
  // console.log(id);
  const itemToEdit = transactions.find((transaction) => transaction.id === id);

  transactionEl.value = itemToEdit.title;
  amountEl.value = itemToEdit.amount;
  editId = itemToEdit.id;

  // console.log(itemToEdit);
}

// update values

function updateValue() {
  income = transactions
    .map((val) => val.amount)
    .filter((val) => val > 0)
    .reduce((prev, val) => prev + val, 0);
  console.log(income);
  expense = transactions
    .map((val) => val.amount)
    .filter((val) => val < 0)
    .reduce((prev, val) => prev + val, 0);

  console.log(expense);

  balance = transactions
    .map((val) => val.amount)
    .reduce((prev, val) => prev + val, 0);

  console.log(balance);

  balanceEl.innerText = `₹ ${balance}`;
  incomeEl.innerText = `₹ ${income}`;
  expenseEl.innerText = `₹ ${expense}`;
}

// event listeners
formEl.addEventListener('submit', function (e) {
  if (transactionEl.value === '' || amountEl.value === '') {
    alert(`enter the transaction details`);
  } else {
    e.preventDefault();

    const transactionName = transactionEl.value;
    const transactionAmount = Number(amountEl.value);
    // update form
    if (isEditing) {
      btnForm.innerText = `add transaction`;

      transactions = transactions.map((transaction) => {
        if (transaction.id === editId) {
          return {
            id: editId,
            title: transactionEl.value,
            amount: Number(amountEl.value),
          };
        } else {
          return transaction;
        }
      });

      init();
    }
    // submit form
    else {
      // create an object
      const transaction = {
        id: Date.now(),
        title: transactionName,
        amount: transactionAmount,
      };

      // add the object in the array

      transactions.push(transaction);

      // display UI
      addTransactionToDom(transaction);
    }

    // console.log(transactions);

    // update value'
    updateValue();

    transactionEl.value = null;
    amountEl.value = null;
  }
});
