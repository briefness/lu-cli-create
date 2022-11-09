#!/usr/bin/env node

const program = require('commander')

// 调用自定义指令
const createCommandsPage = require('./lib/core/create')
createCommandsPage.createCommands()

program.parse(process.argv)
