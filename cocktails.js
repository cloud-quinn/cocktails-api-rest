const data = require('./data.json');
const defaultSchema = require('./schema');

const sanitiseData = (data = [], dataSchema) => {
    if (!dataSchema) {
        return data;
    }
    return data.map(item => Object.keys(item).reduce((newItem, key) => {
        if (dataSchema.hasOwnProperty(key)) {
            newItem[key] = item[key];
        }
        return newItem;
    }, {}));
};

module.exports = {
    getCocktails: () => sanitiseData(data, defaultSchema),
    getByIngredient: (ingredient = '') => sanitiseData(data.filter(cocktail => cocktail.ingredients.find(cocktailIngredient => cocktailIngredient.ingredientName.toLowerCase() === ingredient.toLowerCase())), defaultSchema),
    getWithMaxUnits: (maxUnits) => {
        const maximumUnits = parseFloat(maxUnits);
        if (isNaN(maximumUnits)) {
            throw new Error('maxUnits must be a valid number')
        }
        return sanitiseData(data.filter(cocktail => cocktail.alcoholUnits <= maximumUnits), defaultSchema);
    },
    sanitiseData,
};