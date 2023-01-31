
exports.handler = () => {
  const moment = require("moment/moment");
  const package = require("./package.json");
  const fs = require("fs");
  
  let plugins = require("./plugins.json");
  const last_updated = moment().format("YYYY-MM-DD HH:mm:ss");
  plugins.version = package.version;
  plugins.last_updated = last_updated;
  
  //ANCHOR - write plugins.json
  fs.writeFileSync('./plugins.json', JSON.stringify(plugins,null,2));

  //ANCHOR - write phrain.php
  let phrainPHP = fs.readFileSync("./src/phrain.php", 'utf-8').toString();
  phrainPHP = phrainPHP.replace(/Version: ([0-9.]+)/, `Version: ${package.version}`);
  fs.writeFileSync('./src/phrain.php', phrainPHP);
}