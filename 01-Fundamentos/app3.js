const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf-8');

var words = content.split(' ');

// const reactWordCount = words.filter(
//     (word) => word.toLowerCase().includes('react')
// ).length;


const reactWordCount = content.match(/react/gi ?? []).length;

console.log("Palabras: " + words.length);
console.log("Palabras: " + reactWordCount);



