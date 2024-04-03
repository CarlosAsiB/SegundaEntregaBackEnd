class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
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
        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('Product not found');
        }

        this.products.splice(productIndex, 1);
    }
}

// Ejemplo de uso
const manager = new ProductManager();
console.log(manager.getProducts()); 

manager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
});

manager.addProduct({
    title: "producto prueba 2",
    description: "Este es un producto prueba 2",
    price: 400,
    thumbnail: "Sin imagen",
    code: "dfg456",
    stock: 50
});

console.log(manager.getProducts()); // Muestra los productos agregados y generados con distintas IDs

const product = manager.getProductById(1);
console.log(product); // Muestra el producto con id 1

manager.updateProduct(1, { price: 250 }); // Actualiza el precio del producto con id 1
console.log(manager.getProductById(1)); // Muestra el producto actualizado

manager.deleteProduct(1); // Elimina el producto con id 1
manager.deleteProduct(2); // Elimina el producto con id 2
console.log(manager.getProducts()); // Debe mostrar un arreglo vacío
