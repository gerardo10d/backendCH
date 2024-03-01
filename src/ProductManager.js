const fs = require("fs");

class ProductManager {
  #products;
  static idProduct = 1;
  constructor(path) {
    this.path = path;
  }

  async initialize() {
    this.#products = await this.getProducts();
  }

  async getProducts() {
    try {
      const productsFileContent = await fs.promises.readFile(
        this.path,
        "utf-8"
      );
      return JSON.parse(productsFileContent);
    } catch (err) {
      return [];
    }
  }

  async updateFile() {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.#products, null, "\t")
    );
  }

  async updateProduct(updatedProduct) {
    const existingProductIdx = this.#products.findIndex(
      (prod) => prod.id === updatedProduct.id
    );

    if (existingProductIdx < 0) {
      throw "El id suministrado no existe";
    }

    const prodData = {
      ...this.#products[existingProductIdx],
      ...updatedProduct,
    };
    this.#products[existingProductIdx] = prodData;

    await this.updateFile();
  }

  async deleteProduct(deletedProductId) {
    const existingProductIdx = this.#products.findIndex(
      (prod) => prod.id === deletedProductId
    );

    if (existingProductIdx < 0) {
      throw "El id suministrado no existe";
    }

    this.#products.splice(existingProductIdx, 1);

    await this.updateFile();
  }

  getNewId() {
    const counter = this.#products.length;

    if (counter == 0) {
      return 1;
    } else {
      return this.#products[counter - 1].id + 1;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (title && description && price && thumbnail && code && stock) {
      const product = this.#products.find((prod) => prod.code === code);
      if (product) {
        console.error("El código ya existe");
      } else {
        const product = {
          id: this.getNewId(),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        this.#products.push(product);
        await this.updateFile();
      }
    } else {
      console.error("Todos los campos son obligatorios");
    }
  }

  async getProductById(productId) {
    try {
      const productsFileContent = await fs.promises.readFile(
        this.path,
        "utf-8"
      );
      const productById = JSON.parse(productsFileContent).find(
        (prod) => prod.id === productId
      );
      if (productById === undefined) {
        throw new Error("No se encontró el producto");
      }
      return productById;
    } catch (err) {
      throw err;
    }
  }
}

const main = async () => {
  const path = "./productos.json";
  const manager = new ProductManager(path);

  await manager.initialize();
  // console.log(await manager.getProducts())

  // Se agregan 3 productos
  await manager.addProduct(
    "prod1",
    "descripcion1",
    100,
    "thumbnail1",
    "abc101",
    11
  );
  await manager.addProduct(
    "prod2",
    "descripcion2",
    200,
    "thumbnail2",
    "abc102",
    12
  );
  await manager.addProduct(
    "prod3",
    "descripcion3",
    300,
    "thumbnail3",
    "abc103",
    13
  );
  await manager.addProduct(
    "prod4",
    "descripcion4",
    400,
    "thumbnail4",
    "abc104",
    14
  );
  await manager.addProduct(
    "prod5",
    "descripcion5",
    500,
    "thumbnail5",
    "abc105",
    15
  );
  await manager.addProduct(
    "prod6",
    "descripcion6",
    600,
    "thumbnail6",
    "abc106",
    16
  );
  await manager.addProduct(
    "prod7",
    "descripcion7",
    700,
    "thumbnail7",
    "abc107",
    17
  );
  await manager.addProduct(
    "prod8",
    "descripcion8",
    800,
    "thumbnail8",
    "abc108",
    18
  );
  await manager.addProduct(
    "prod9",
    "descripcion9",
    900,
    "thumbnail9",
    "abc109",
    19
  );
  await manager.addProduct(
    "prod10",
    "descripcion10",
    1000,
    "thumbnail10",
    "abc110",
    110
  );
};

// main();

module.exports = {
  ProductManager
}
