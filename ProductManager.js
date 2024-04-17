const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(filename) {
        this.filePath = path.join(__dirname, filename);
        this.loadProducts(); // Cargar productos desde el archivo al iniciar
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            const { products, nextId } = JSON.parse(data);
            this.products = products;
            this.nextId = nextId;
        } catch (error) {
            this.products = [];
            this.nextId = 1;
        }
    }

    saveProducts() {
        const data = JSON.stringify({ products: this.products, nextId: this.nextId }, null, 2);
        fs.writeFileSync(this.filePath, data, 'utf8');
    }

    getProducts() {
        return this.products;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        const product = {
            id: this.nextId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        this.saveProducts(); // Guardar cada vez que se modifica la lista de productos
        return product;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    updateProduct(id, productData) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('Product not found');
        }

        this.products[productIndex] = { ...this.products[productIndex], ...productData, id };
        this.saveProducts(); // Guardar cambios en el archivo
        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('Product not found');
        }

        this.products.splice(productIndex, 1);
        this.saveProducts(); // Guardar cambios en el archivo
    }
}

module.exports = ProductManager;
