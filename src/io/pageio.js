const fs = require("fs");
const path = require("path");

module.exports = class PageIO {
  constructor(sitedir) {
    this._sitedir = sitedir;
  }

  getPageNames() {
    return new Promise((resolve, reject) => {
      let pagesDir = path.join(this._sitedir, "pages");
      fs.readdir(pagesDir, {encoding: "utf8"}, (err, files) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(this._processFilenames(files));
        }
      });
    });
  }

  getPage(name) {
    return Promise((resolve, reject) => {
      let file = path.join(this._sitedir, "pages", name + ".json");
      fs.readFile(file, {encoding: "utf8"}, (err, data) => {
        if(err) {
          reject(err);
        }
        else {
          try {
            let json = JSON.parse(data);
            resolve(json);
          }
          catch(e) {
            reject(e);
          }
        }
      });
    });
  }

  _processFilenames(filenames) {
    return filenames.filter(f => f.indexOf(".json") === f.length - 5).map(f => f.substr(0, f.length - 5));
  }
}
