import Account from '../models/Account';
import Transaction, { TransactionType } from '../models/Transaction';

export default {
    render(account: Account) {
        return {
            id: account.id,
            name: account.name,
            description: account.description,
            type: account.type,
            balance: account.transactions.reduce((acc, next) => {
              return { amount: acc.amount + ( next.type === TransactionType.REVENUE ? next.amount : next.amount * -1)} as Transaction;
            }, { amount: 0}).amount,
        }
    },

    renderMany(accounts: Account[]) {
        return accounts ? accounts.map(account => this.render(account)) : [];
    }
}