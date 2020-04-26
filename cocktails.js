const data = require('./data.json');

module.exports = {
    getCocktails: () => data,
    getByIngredient: (ingredient = '') => data.filter(cocktail => cocktail.ingredients.find(cocktailIngredient => cocktailIngredient.ingredientName.toLowerCase() === ingredient.toLowerCase())),
    getWithMaxUnits: (maxUnits) => {
        const maximumUnits = parseFloat(maxUnits);
        if (isNaN(maximumUnits)) {
            throw new Error('maxUnits must be a valid number')
        }
        return data.filter(cocktail => cocktail.alcoholUnits <= maximumUnits);
    },
};