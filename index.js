const express = require('express');
const { getCocktails, getByIngredient, getWithMaxUnits } = require('./cocktails');

const app = express();

app.get('/cocktails', (req, res) => {
    res.json(getCocktails());
});

app.get('/cocktailsByIngredient/:ingredient', (req, res) => {
    res.json(getByIngredient(req.params.ingredient));
});

app.get('/cocktailsWithMaxUnits/:maxUnits', (req, res) => {
    res.json(getWithMaxUnits(req.params.maxUnits));
});

app.listen(4000);
