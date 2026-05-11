try {
  require('./server.js');
} catch (err) {
  require('fs').writeFileSync('err.log', err.stack);
}
