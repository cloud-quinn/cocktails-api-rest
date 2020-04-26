const { getCocktails, getByIngredient, getWithMaxUnits, sanitiseData } = require('./cocktails');

jest.mock('./data.json', () => ([
    {
        "alcoholUnits": 2.0,
        "cocktailName": "Test Cocktail",
        "ingredients": [
            {
                "ingredientName": "Test Ingredient",
                "quantity": {
                    "unit": "ml",
                    "value": 1
                }
            },
        ]
    },
    {
        "alcoholUnits": 1.0,
        "cocktailName": "Test Cocktail 2",
        "ingredients": [
            {
                "ingredientName": "Another Ingredient",
                "quantity": {
                    "unit": "ml",
                    "value": 1
                }
            },
        ]
    }
]));

describe('Get All Cocktails', () => {
    it('returns all stored values', () => {
        expect(getCocktails()).toHaveLength(2);
    });
});

describe('Get Cocktails By Ingredient', () => {
    let cocktailList;

    beforeAll(() => {
        cocktailList = getByIngredient('test ingredient');
    });

    it('does not return all stored values', () => {
        expect(cocktailList).toHaveLength(1);
    });

    it('returns the expected values', () => {
        expect(cocktailList[0].cocktailName).toBe("Test Cocktail");
    });
});

describe('Get Cocktails By Maximum Alcohol Units', () => {
    let cocktailList;

    beforeAll(() => {
        cocktailList = getWithMaxUnits(1.5);
    });

    it('does not return all stored values', () => {
        expect(cocktailList).toHaveLength(1);
    });

    it('returns the expected values', () => {
        expect(cocktailList[0].cocktailName).toBe("Test Cocktail 2");
    });
});

describe('Get Cocktails By Maximum Alcohol Units: Invalid input', () => {
    it('throws an error', () => {
        expect(() => getWithMaxUnits("one point five")).toThrow();
    });
});

describe('Sanitise data', () => {
    let sanitisedData;

    const mockData = [{
        testProperty: 'test value',
        testProperty2: 'test value 2',
    },
    {
        testProperty: 'test value',
        testProperty2: 'test value 2',
    }];

    it('returns all properties if no schema is defined', () => {
        sanitisedData = sanitiseData(mockData);
        expect(sanitisedData).toEqual(mockData);
    });
    
    it('removes properties not in the defined schema', () => {
        const expected = [{
            testProperty2: 'test value 2',
        },
        {
            testProperty2: 'test value 2',
        }];
        sanitisedData = sanitiseData(mockData, { testProperty2: 'string' });
        expect(sanitisedData).toEqual(expected);
    });
});