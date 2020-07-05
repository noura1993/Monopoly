use monopoly;
db.dropDatabase()

db.properties.insertMany([
    {
        "name": "Ahmed Station",
        "colour": "red",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Nourhan Station",
        "colour": "red",
        "value": 60,
        "rent_value": 6
    },
    {
        "name": "Ronan Station",
        "colour": "red",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Fady Station",
        "colour": "red",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Ollie Street",
        "colour": "yellow",
        "value": 50,
        "rent_value": 10
    },
    {
        "name": "Keith Street",
        "colour": "yellow",
        "value": 50,
        "rent_value": 10
    },    
    {
        "name": "Sara Street",
        "colour": "yellow",
        "value": 50,
        "rent_value": 10
    },    
    {
        "name": "Ed Street",
        "colour": "green",
        "value": 50,
        "rent_value": 10
    },
    {
        "name": "Alex Chance Cards",
        "colour": "green",
        "value": 0,
        "rent_value": 0
    },
    {
        "name": "Adam Street",
        "colour": "green",
        "value": 50,
        "rent_value": 10
    },
    {
        "name": "Rumen Street",
        "colour": "blue",
        "value": 50,
        "rent_value": 10
    },
    {
        "name": "Craig Street",
        "colour": "blue",
        "value": 50,
        "rent_value": 10
    },
    {
        "name": "Johns Nice Street",
        "colour": "blue",
        "value": 50,
        "rent value": 5
    },
    {
        "name": "Louise Believes In You",
        "colour": "purple",
        "value": 50,
        "rent_value": 0
    },
    {
        "name": "Harrison Folks Street",
        "colour": "purple",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Mari Street",
        "colour": "purple",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Janey Street",
        "colour": "orange",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Eugene Street",
        "colour": "orange",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Maria Street",
        "colour": "orange",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Morag Street",
        "colour": "pink",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Castle Terrace",
        "colour": "pink",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Princes Street",
        "colour": "pink",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "The Royal Mile",
        "colour": "black",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Leith",
        "colour": "black",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Granton",
        "colour": "black",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Waverley",
        "colour": "grey",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Haymarket",
        "colour": "grey",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "The Meadows",
        "colour": "grey",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Arthurs Seat",
        "colour": "navy",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Calton Hill",
        "colour": "navy",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Corstorphine Hill",
        "colour": "navy",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "Vue Lane",
        "colour": "brown",
        "value": 50,
        "rent_value": 5
    },
    {
        "name": "JavaScript Hill",
        "colour": "brown",
        "value": 50,
        "rent_value": 5
    }
]);

db.createCollection("players");