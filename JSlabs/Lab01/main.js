import json

class Transaction:
    def __init__(self, transaction_id, transaction_date, transaction_amount, transaction_type, transaction_description, merchant_name, card_type):
        self.transaction_id = transaction_id
        self.transaction_date = transaction_date
        self.transaction_amount = transaction_amount
        self.transaction_type = transaction_type
        self.transaction_description = transaction_description
        self.merchant_name = merchant_name
        self.card_type = card_type
    
    def string(self):
        return json.dumps({
            "transaction_id": self.transaction_id,
            "transaction_date": self.transaction_date,
            "transaction_amount": self.transaction_amount,
            "transaction_type": self.transaction_type,
            "transaction_description": self.transaction_description,
            "merchant_name": self.merchant_name,
            "card_type": self.card_type
        })

class TransactionAnalyzer:
    def __init__(self, transactions):
        self.transactions = transactions
    
    def addTransaction(self, transaction):
        self.transactions.append(transaction)
    
    def getAllTransaction(self):
        return [transaction.string() for transaction in self.transactions]
    
    def getUniqueTransactionType(self):
        types = set()
        for transaction in self.transactions:
            types.add(transaction.transaction_type)
        return list(types)
    
    def calculateTotalAmount(self):
        total = 0.0
        for transaction in self.transactions:
            total += float(transaction.transaction_amount)
        return total
    
    def calculateTotalAmountByDate(self, year=None, month=None, day=None):
        total = 0.0
        for transaction in self.transactions:
            if year is None or transaction.transaction_date.startswith(year):
                if month is None or transaction.transaction_date.startswith(year + "-" + month):
                    if day is None or transaction.transaction_date == year + "-" + month + "-" + day:
                        total += float(transaction.transaction_amount)
        return total
    
    def getTransactionByType(self, type):
        return [transaction.string() for transaction in self.transactions if transaction.transaction_type == type]
    
    def getTransactionsInDateRange(self, startDate, endDate):
        return [transaction.string() for transaction in self.transactions if startDate <= transaction.transaction_date <= endDate]
    
    def getTransactionsByMerchant(self, merchantName):
        return [transaction.string() for transaction in self.transactions if transaction.merchant_name == merchantName]
    
    def calculateAverageTransactionAmount(self):
        total = self.calculateTotalAmount()
        return total / len(self.transactions) if len(self.transactions) > 0 else 0
    
    def getTransactionsByAmountRange(self, minAmount, maxAmount):
        return [transaction.string() for transaction in self.transactions if minAmount <= float(transaction.transaction_amount) <= maxAmount]
    
    def calculateTotalDebitAmount(self):
        total = 0.0
        for transaction in self.transactions:
            if transaction.transaction_type == 'debit':
                total += float(transaction.transaction_amount)
        return total
    
    def findMostTransactionsMonth(self):
        months = {}
        for transaction in self.transactions:
            month = transaction.transaction_date[5:7]
            if month in months:
                months[month] += 1
            else:
                months[month] = 1
        return max(months, key=months.get)
    
    def findMostDebitTransactionMonth(self):
        debit_months = {}
        for transaction in self.transactions:
            if transaction.transaction_type == 'debit':
                month = transaction.transaction_date[5:7]
                if month in debit_months:
                    debit_months[month] += 1
                else:
                    debit_months[month] = 1
        return max(debit_months, key=debit_months.get)
    
    def mostTransactionTypes(self):
        debit_count = 0
        credit_count = 0
        for transaction in self.transactions:
            if transaction.transaction_type == 'debit':
                debit_count += 1
            elif transaction.transaction_type == 'credit':
                credit_count += 1
        if debit_count > credit_count:
            return 'debit'
        elif debit_count < credit_count:
            return 'credit'
        else:
            return 'equal'
    
    def getTransactionsBeforeDate(self, date):
        return [transaction.string() for transaction in self.transactions if transaction.transaction_date < date]
    
    def findTransactionById(self, id):
        for transaction in self.transactions:
            if transaction.transaction_id == id:
                return transaction.string()
        return None
    
    def mapTransactionDescriptions(self):
        return [transaction.transaction_description for transaction in self.transactions]

# Пример использования класса:
transactions = [
    Transaction("1", "2019-01-01", "100.00", "debit", "Payment for groceries", "SuperMart", "Visa"),
    Transaction("2", "2019-01-02", "50.00", "credit", "Refund for returned item", "SuperMart", "Mastercard"),
    # Другие транзакции...
]

analyzer = TransactionAnalyzer(transactions)

print(analyzer.calculateTotalAmount())
print(analyzer.getUniqueTransactionType())
print(analyzer.findMostTransactionsMonth())
print(analyzer.mostTransactionTypes())

