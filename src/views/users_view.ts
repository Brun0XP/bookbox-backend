import User from '../models/User';
import categoriesView from './categories_view';
import accountsView from './accounts_view';

export default {
    render(user: User) {
      const accounts = accountsView.renderMany(user.accounts)
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            categories: categoriesView.renderMany(user.categories),
            totalBalance: accounts.reduce((acc, next) => {
              return { balance: acc.balance + next.balance }
            }, { balance: 0}).balance,
            accounts
        }
    },

    renderMany(users: User[]) {
        return users.map(user => this.render(user));
    }
}