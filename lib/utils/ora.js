const ora = require('ora')

const loadingCreate = ora('Loading unicorns')
loadingCreate.color = 'green'

module.exports = {
    loadingCreate,
}
