const fs = require("fs");

module.exports = class Container {
  lastId = 0;
  constructor(name, format) {
    this.path = `./${name}`;
    this.format = format;
  }

  async save(obj) {
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      obj.id = ++this.lastId;
      data.push(obj);
      fs.promises.writeFile(this.path, JSON.stringify(data));
      return obj.id;
    } catch (err) {
      console.log("The file does not exist");
      console.log("Creating new file");
      try {
        fs.promises.writeFile(this.path, JSON.stringify([]));
        console.log("File created");
        this.save(obj);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getById(id) {
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      return data.find((obj) => obj.id === id);
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      let datos = await fs.promises.readFile(this.path, this.format);
      return JSON.parse(datos);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      const index = data.findIndex((obj) => obj.id === id);
      if (index === -1) return;
      data.splice(index, 1);
      fs.promises.writeFile(this.path, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      fs.promises.writeFile(this.path, JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }
  }
};