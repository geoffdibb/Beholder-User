const newman = require('newman')

newman.run({
    collection:
    require('./postman.json'), reporters: 'cli',
})