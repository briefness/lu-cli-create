const program = require('commander')

const { createProjectAction } = require('../utils/actions')

const createCommands = ()  => {
    program
        .command('create')
        .description('以模板为基础创建新的项目')
        .action(createProjectAction)
}

module.exports = {
    createCommands
}