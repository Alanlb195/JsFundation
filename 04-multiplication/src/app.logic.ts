import * as fs from 'fs';
import { yarg } from './config/plugins/args.plugin';


const { b: base, l: limit, s: showTable } = yarg;

let outputMessage = '';
const table = base;
const headerMessage =
`
========================
    Table of ${table}
========================

`

for (let i = 1; i <= limit; i++) {
    outputMessage += `${table} x ${i} = ${table * i} \n`;
}

if (showTable) {
    outputMessage = headerMessage + outputMessage;
}

const outputPath = `outputs`;
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tableOf${base}.txt`, outputMessage);
console.log('File created');
