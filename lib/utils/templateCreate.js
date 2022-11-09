const ejs = require('ejs')
const fs = require("fs");
const path = require("path");

const packageCreate = (name) => {
    let templateCode = fs.readFileSync(path.join(__dirname,'../../components/package.ejs'))
    let template = ejs.render(templateCode.toString(),{
        name: name,
    })
    return template;
}

module.exports = {
    packageCreate,
}
