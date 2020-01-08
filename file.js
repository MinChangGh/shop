const fs = require('fs');

// fs.readFile('./public/file/a.doc', 'utf8', (err, data) => {
// if (err) throw err;
// console.log(data);
// });

fs.readFile('./public/file/b.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.readdir('./public/file', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

