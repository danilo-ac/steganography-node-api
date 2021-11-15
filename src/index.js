/*
Gravar Mensagem na Imagem
1. arquivo | transforma arquivo de imagem em binario
2. arquivo | verifica quantos bytes existem no arquivo de imagem
3. mensagem | verifica quantos bytes serão necessários para gravar msg
    3.1 mensagem | sempre deve terminar com '.' ou '0010 1110'
4. fn | arquivo comporta mensagem?
    4.1 Se 'não' retorna false | Se 'sim' retorna true
*/


import fs from 'fs'
import path from 'path';
import { Buffer } from 'buffer';

const fileName = 'teste.bmp';

const filePath = path.resolve('src', 'assets', 'tmp', fileName);

// const fileLenght = fs.readFileSync(filePath).byteLength;

console.log('checkpoint 1', fs.readFileSync(filePath).at(19337).toString(2).padStart(8, 0)) //checkpoint 0

const file = fs.createWriteStream(filePath, { start: 19337, flags: 'r+' })
const buf = Buffer.alloc(1)
buf[0] = parseInt('01111101', 2)

console.log('checkpoint 2', buf[0].toString(2).padStart(8, 0))

file.write(buf)
file.end()


console.log('checkpoint 3',
fs.readFileSync(filePath).at(19337).toString(2).padStart(8, 0))




/* Isso aqui funciona!
import { Buffer } from 'buffer';


const str = parseInt('01111101', 2);
const buf = Buffer.allocUnsafe(1);

buf[0] = str;



console.log(
    buf.at(0).toString(2).padStart(8, 0)[0]
);
*/