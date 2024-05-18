const transactions = [];
let transactionId = 1;

function addTransaction(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const transaction = {
        id: transactionId++,
        date,
        amount,
        category,
        description
    };

    transactions.push(transaction);
    addTransactionToTable(transaction);
    updateTotal();
    document.getElementById('transaction-form').reset();
}

function addTransactionToTable(transaction) {
    const table = document.getElementById('transaction-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    row.className = transaction.amount > 0 ? 'income' : 'expense';
    row.dataset.id = transaction.id;

    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description}</td>
        <td><button onclick="deleteTransaction(${transaction.id})">Удалить</button></td>
    `;

    row.addEventListener('click', () => showDetails(transaction));
}

function deleteTransaction(id) {
    const index = transactions.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        document.querySelector(`[data-id="${id}"]`).remove();
        updateTotal();
    }
}

function updateTotal() {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById('total-amount').textContent = total.toFixed(2);
}

function showDetails(transaction) {
    document.getElementById('transaction-details').innerHTML = `
        <p><strong>ID:</strong> ${transaction.id}</p>
        <p><strong>Дата:</strong> ${transaction.date}</p>
        <p><strong>Сумма:</strong> ${transaction.amount}</p>
        <p><strong>Категория:</strong> ${transaction.category}</p>
        <p><strong>Описание:</strong> ${transaction.description}</p>
    `;
}

document.getElementById('transaction-form').addEventListener('submit', addTransaction);
