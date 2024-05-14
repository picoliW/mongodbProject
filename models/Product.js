const conn = require("../db/conn");
const { ObjectId } = require("mongodb");

class Product {
  constructor(name, image, price, description) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
  }

  save() {
    return conn.db().collection("products").insertOne({
      name: this.name,
      image: this.image,
      price: this.price,
      description: this.description,
    });
  }

  static getProducts() {
    return conn.db().collection("products").find().toArray();
  }

  static async getProductById(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }
    const product = await conn
      .db()
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    return product;
  }

  static async removeProductById(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }
    await conn
      .db()
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
    return;
  }

  updateProduct(id) {
    conn
      .db()
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: this });
    return;
  }
}

module.exports = Product;
