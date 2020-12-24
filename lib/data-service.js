const { ifError } = require("assert");
const fs = require("fs");
const path = require("path");

const lib = {}

lib.baseDir = path.join(__dirname, "..", ".data")

lib.create = (dir, file, data, callback) => {
  fs.open(path.join(lib.baseDir, dir, file + ".json"), "wx", (err, fileData) => {
    console.log(err, fileData)
    if (err) return callback("Could not create new file, it may already exist")

    const stringData = JSON.stringify(data);

    fs.writeFile(fileData, stringData, err => {
      if (err) return callback("Error writing to new file")

      fs.close(fileData, err => {
        if (err) return callback("Error closing new file")

        return callback(undefined, "Write file success")
      })
    })

  })
}

lib.read = (dir, file, callback) => {
  console.log()
  fs.readFile(path.join(lib.baseDir, dir, file + ".json"), "utf8", (err, data) => {
    callback(err, data)
  })
}

lib.update = (dir, file, data, callback) => {
  fs.open(path.join(lib.baseDir, dir, file + ".json"), "r+", (err, fileData) => {
    if (err) return callback("Could not open file, it may not be exist")

    const stringData = JSON.stringify(data)

    fs.truncate(fileData, err => {
      if (err) return callback("Cannot trunk file")

      fs.writeFile(fileData, stringData, err => {
        if (err) return callback("Cannot write file")

        fs.close(fileData, err => {
          if (err) return callback("Cannot close file")

          return callback(undefined, "Update file success")
        })
      })
    })
  })
}

lib.delete = (dir, file, callback) => {
  fs.unlink(path.join(lib.baseDir, dir, file + ".json"), err => {
    if (err) return callback("Cannot delete file")

    return callback(undefined, "Delete file success")
  })
}

module.exports = lib;