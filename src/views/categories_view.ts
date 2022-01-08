import Category from '../models/Category';

export default {
    render(category: Category) {
        return {
            id: category.id,
            name: category.name,
            planned: category.planned,
            type: category.type,
        }
    },

    renderMany(categories: Category[]) {
        return categories ? categories.map(category => this.render(category)) : [];
    }
}