const fs = require("fs");

module.exports = class Container {
  constructor(name, format) {
    this.path = `./${name}`;
    this.format = format;
  }

  async save(obj) {
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      obj.id = data[data.length - 1].id + 1;
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
        err.name = "Server Error";
        throw new Error(err);
      }
    }
  }

  async getById(id) {
    id = parseInt(id);
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      return data.find((obj) => obj.id === id);
    } catch (err) {
      console.log("error en FileManager", err);
      err.name = "Server Error";
      throw new Error(err);
    }
  }

  async getAll() {
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      return JSON.parse(data);
    } catch (err) {
      err.name = "Server Error";
      throw new Error(err);
    }
  }

  async updateById(id, newdata) {
    id = parseInt(id);
    newdata.id = id;
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      const index = data.findIndex((obj) => obj.id === id);
      if (index === -1) return "Error ID";
      data[index] = newdata;
      fs.promises.writeFile(this.path, JSON.stringify(data));
      return "OK";
    } catch (err) {
      err.name = "Server Error";
      throw new Error(err);
    }
  }

  async deleteById(id) {
    id = parseInt(id);
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      const index = data.findIndex((obj) => obj.id === id);
      if (index === -1) return "Error ID";
      data.splice(index, 1);
      fs.promises.writeFile(this.path, JSON.stringify(data));
      return "OK";
    } catch (err) {
      err.name = "Server Error";
      throw new Error(err);
    }
  }

  async deleteAll() {
    try {
      fs.promises.writeFile(this.path, JSON.stringify([]));
    } catch (err) {
      err.name = "Server Error";
      throw new Error(err);
    }
  }
};