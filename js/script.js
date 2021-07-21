const transactionsUl = document.querySelector('#transactions');
const balanceDisplay = document.querySelector('#balance');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

let dammyTransaction = [
    { id: 1, name: 'Bolo de brigadéiro', amount: -20},
    { id: 2, name: 'Bicicleta', amount: -500},
    { id: 3, name: 'Salário', amount: 1500},
    { id: 4, name: 'Gasolina', amount: -300} 
]
const removeTransaction = ID => {
  dummyTransaction = dummyTransaction.filter(transaction => transaction.id !== ID);
  console.log(dummyTransaction);
  init();
}

const addTransactionIntoDOM = transaction =>{

  const operator = transaction.amount < 0 ? '-': '+';
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'; 
  const amountWhithoutOperator = Math.abs(transaction.amount);

  const li = document.createElement('li');


  li.classList.add(CSSClass);
  li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWhithoutOperator}</span><button class="delete-btn" onClick"removeTransaction(${transaction.id})" >x</button>
  `
  transactionsUl.append(li);
}

const UpdateBalanceValues = () => {

  const transactionsAmanouts = dammyTransaction
    .map( transaction => transaction.amount);
  const total = transactionsAmanouts
    .reduce((accumulator,transaction) => accumulator + transaction,0)
    .toFixed(2);
  const income = transactionsAmanouts
    .filter(number => number > 0)
    .reduce((accumulator,number) => accumulator + number,0)
    .toFixed(2);
  const expense = Math.abs(transactionsAmanouts
    .filter(number => number <0)
    .reduce((accumulator, number )=> accumulator + number,0)
    .toFixed(2));

  balanceDisplay.textContent = ` R$ ${total}`;
  incomeDisplay.textContent = ` R$ ${income}`;
  expenseDisplay.textContent = ` R$ ${expense}`;
}

const init = () => {
  transactionsUl.innerHTML = '';
  dammyTransaction.forEach(addTransactionIntoDOM);
  UpdateBalanceValues();
}
init();

const generateID = ()=> Math.random(Math.random()*100);

form.addEventListener('submit', event => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();

  if(transactionName === '' || transactionAmount === ''){
    alert("Por favor preencher todos os campos da transação");
    return;
  }
  const transaction = {
    id:generateID(),
    name:transactionName,
    amount:Number(transactionAmount)
  } 
  
  dammyTransaction.push(transaction);
  init();

  inputTransactionName.value ='';
  inputTransactionAmount.value ='';
})
