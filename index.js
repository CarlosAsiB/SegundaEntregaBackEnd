const express = require('express');
const ProductManager = require('./ProductManager'); 
const app = express();
const PORT = 8080;

app.use(express.json()); 

const manager = new ProductManager('products.json'); 

// Ruta raiz
app.get('/', (req, res) => {
    res.send('Welcome to the Product Management API! Use /products to access products.');
});

// Ruta para todos los productos y limitar la cantidad de productos
app.get('/products', (req, res) => {
    try {
        let products = manager.getProducts();
        if (req.query.limit) { 
            const limit = parseInt(req.query.limit); 
            if (!isNaN(limit) && limit > 0) {
                products = products.slice(0, limit); 
            } else {
                return res.status(400).json({ error: "Invalid limit value" }); 
            }
        }
        res.json(products); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

// Ruta para un producto en particular por id
app.get('/products/:id', (req, res) => {
    try {
        const product = manager.getProductById(parseInt(req.params.id));
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Ruta para agregar un producto
app.post('/products', (req, res) => {
    try {
        const product = manager.addProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para actualizar un producto
app.put('/products/:id', (req, res) => {
    try {
        const product = manager.updateProduct(parseInt(req.params.id), req.body);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Ruta para eliminar un producto
app.delete('/products/:id', (req, res) => {
    try {
        manager.deleteProduct(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
