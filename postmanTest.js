const newman = require('newman');
const collection = require('./postmanCollection.json')
const treeify = require('treeify');
const { app } = require('./server');
// const environment = require('../collections/environment.json');

// newman.run({
//     collection:
//     require('./postman.json'), reporters: 'cli',
// })

// const server = app.listen(
//   port,
//   () => {
//     console.log(`Test server listing at port ${port}`);
//   },
// );

newman.run({
  collection,
//   environment,
  color: true,
  reporters: ['cli']
}).on('start', (err, args) => {
}).on('done', (err, summary) => {
//   server.close(() => console.log('Test server Terminated'));
  if (err || summary.run.failures.length) {
    const failureCount = summary.run.failures.length;
    summary.run.failures.forEach((element, index) => {
      const header = `${'='.repeat(32)}[ Error-${index + 1} ]${'='.repeat(32)}`;
      console.error(header);
      console.error('Tag      :', element.parent.name);
      console.error('Source   :', element.source.name);
      console.error('Type     :', element.error.name);
      console.error('Test     :', element.error.test);
      console.error('Error    :', element.error.message);
      if (index === failureCount - 1) console.error('~'.repeat(header.length));
    });
    console.error(treeify.asTree(summary.run.stats, true));
    process.exit(1);
  } else {
    console.log('🍺🍺 🍺🍺 🍺🍺 🍺🍺 🍺🍺');
    process.exit(0);
  }
});
