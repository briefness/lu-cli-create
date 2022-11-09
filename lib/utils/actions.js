const { commandSpawn } = require('./terminal')
const { createInformation } = require('./inquirer')
const inquirer = require('inquirer')
const { loadingCreate } = require('./ora')
const fs = require("fs");
const stat = fs.stat;
const path = require("path");
const { packageCreate } = require('./templateCreate')

// 工具当前目录
const allDir = path.join(__dirname, "../../template");
const componentsDir = path.join(__dirname, "../../template/src");

const createProjectAction = () => {
    inquirer.prompt(createInformation).then(async(res) => {
        // console.log(res.createName,res.compList)
        loadingCreate.start('项目正在努力创建中')
        // 预创建总文件夹
        mkdirfs(res.createName)
        // 复制不可选的所有文件
        fn(allDir,res.createName)
        // 拉取所选择模块
        if(res.compList.length > 0) {
            res.compList.forEach(item => {
                // console.log(`${componentsDir}/${item}`)
                exists(`${componentsDir}/${item}`, `${res.createName}/src/${item}`, copy);
            })
        }
        // 创建并写入需按配置更改内容的文件
        fs.writeFileSync(`${res.createName}/package.json`, packageCreate(res.createName));

        loadingCreate.succeed('项目完成创建')
        // 判断系统平台
        loadingCreate.start('正在努力拉取依赖')
        const command = process.platform === 'win32'?'npm.cmd':'npm'
        // 执行npm install
        await commandSpawn(command,['install'],{cwd:`./${res.createName}/`})
        loadingCreate.succeed('项目已完成创建并成功拉取依赖')
    })
}
function mkdirfs(name){
    fs.mkdir(`./${name}`,(err)=>{
        if (err) {
            console.log("name文件夹创建失败");
            return;
        }
    })
    fs.mkdir(`./${name}/src`,(err)=>{
        if (err) {
            console.log("src文件夹创建失败");
            return;
        }
    })
}
function fn(src,dst){
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function (path) {
            if(path == `src`){
                return
            }else{
                var _src = src + "/" + path,
                _dst = dst + "/" + path,
                readable,
                writable;
                stat(_src, function (err, st) {
                    if (err) {
                        throw err;
                    }
                    if (st.isFile()) {
                    readable = fs.createReadStream(_src);
                    writable = fs.createWriteStream(_dst);
                    readable.pipe(writable);
                    }
                    else if (st.isDirectory()) {
                        exists(_src, _dst, copy);
                    }
                });
            }
        });
    });
}
var exists = function (src, dst, callback) {
    fs.exists(dst, function (exists) {
        if (exists) {
            callback(src, dst);
        }
        else {
            fs.mkdir(dst, function () {
                callback(src, dst);
            });
        }
    });
};
var copy = function (src, dst) {
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function (path) {
            var _src = src + "/" + path,
                _dst = dst + "/" + path,
                readable,
                writable;
            stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }
                if (st.isFile()) {
                readable = fs.createReadStream(_src);
                writable = fs.createWriteStream(_dst);
                readable.pipe(writable);
                }
                else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
};

module.exports = {
    createProjectAction,
}
