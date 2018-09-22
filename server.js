var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var products = [
{
    id: 1,
    name: 'laptop',
    ammount: '200'
},
{
    id: 2,
    name: 'microwave',
    ammount: '200'
}
];

var currentId = 2;

var PORT = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(bodyParser.json());

// DISPLAY PRODUCTS TO AJAX AS JSON,
// SEND DB OF PRODUCTS
app.get('/products', function(req, res) {
    res.send({ products: products });
});

// RECEIVE INPUT FIELDS FROM AJAX POST
// INSERT INTO DB
app.post('/products', function(req, res) {
    var productName = req.body.name;
    var ammount = req.body.ammount;
    currentId++;

    products.push({
        id: currentId,
        name: productName,
        ammount: ammount
    });

    res.send('Successfully created product!');
});

// UPDATE DB
app.put('/products/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;
    var newAmmount = req.body.newAmmount;

    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            product.name = newName;
            product.ammount = newAmmount;
        }
    });

    res.send('Succesfully updated product!');
});

// DELETE FROM DB BASED ON ID 
app.delete('/products/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            products.splice(index, 1);
        }
    });

    res.send('Successfully deleted product!');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
