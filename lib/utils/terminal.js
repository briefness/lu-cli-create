const {spawn} = require('child_process')

const commandSpawn = (...args) => {
    return new Promise((resolve,reject) => {
        const childProcess = spawn(...args)
        // 显示子进程的控制台打印信息
        childProcess.stdout.pipe(process.stdout)
        childProcess.stderr.pipe(process.stderr)
        childProcess.on("close",() => {
            resolve()
        })
    })
}

module.exports = {
    commandSpawn
}
