const transactions = [];
let transactionIdCounter = 1;

/**
 * Добавляет новую транзакцию.
 * @param {Event} event.
 */
function addTransaction(event) {
    event.preventDefault();

    // Получение данных
    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    // Создание транзакции
    const transaction = {
        id: transactionIdCounter++, 
        date,
        amount,
        category,
        description
    };

    // Добавление транзакции в массив и таблицу
    transactions.push(transaction);
    appendTransactionToTable(transaction);
    calculateTotal(); 
    document.getElementById('transaction-form').reset();
}

/* @param {Object} transaction - Транзакция для добавления. */
function appendTransactionToTable(transaction) {
    const table = document.getElementById('transaction-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Установка класса для строки в зависимости от суммы
    newRow.className = transaction.amount > 0 ? 'income' : 'expense';
    newRow.dataset.id = transaction.id;

    // Заполнение строки данными
    newRow.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
        <td><button onclick="deleteTransaction('${transaction.id}')">Удалить</button></td>
    `;


    newRow.addEventListener('click', () => showTransactionDetails(transaction));
}

/* Удаляет транзакцию. @param {string} id.  */
function deleteTransaction(id) {
    // Поиск индекса транзакции по ID
    const index = transactions.findIndex(transaction => transaction.id === parseInt(id));
    if (index !== -1) {
        transactions.splice(index, 1); // Удаление транзакции из массива
        document.querySelector(`[data-id="${id}"]`).remove(); // Удаление строки из таблицы
        calculateTotal();
    }
}


function calculateTotal() {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById('total-amount').textContent = total.toFixed(2); // Отображение общей суммы
}


function showTransactionDetails(transaction) {
    document.getElementById('transaction-details').innerHTML = `
        <p><strong>ID:</strong> ${transaction.id}</p>
        <p><strong>Дата:</strong> ${transaction.date}</p>
        <p><strong>Сумма:</strong> ${transaction.amount}</p>
        <p><strong>Категория:</strong> ${transaction.category}</p>
        <p><strong>Описание:</strong> ${transaction.description}</p>
    `;
}


document.getElementById('transaction-form').addEventListener('submit', addTransaction);
