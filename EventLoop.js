const fs = require('fs');

setTimeout(() => {
    console.log('Timer ran out');
}, 0);
setImmediate(() => {
    console.log('Immediate ran out');
});

fs.readFile('test.txt', 'utf8', () => {});