/*
Gravar Mensagem na Imagem
1. arquivo | transforma arquivo de imagem em binario
2. arquivo | verifica quantos bytes existem no arquivo de imagem
3. mensagem | verifica quantos bytes serão necessários para gravar msg
    3.1 mensagem | sempre deve terminar com '.' ou '0010 1110'
4. fn | arquivo comporta mensagem?
    4.1 Se 'não' retorna false | Se 'sim' retorna true
*/

/*
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
*/



/* Isso aqui funciona!
import { Buffer } from 'buffer';


const str = parseInt('01111101', 2);
const buf = Buffer.allocUnsafe(1);

buf[0] = str;



console.log(
    buf.at(0).toString(2).padStart(8, 0)[0]
);
*/



/*
//teste para pegar byte e sobrescrever posição 7 com bit escolhido
import fs from 'fs'
import path from 'path';
import { Buffer } from 'buffer';

const fileName = 'teste.bmp';

const filePath = path.resolve('src', 'assets', 'tmp', fileName);

// const fileLenght = fs.readFileSync(filePath).byteLength;

console.log('checkpoint 1', fs.readFileSync(filePath).at(19337).toString(2).padStart(8, 0)) //checkpoint 0

const fffff = fs.openSync(filePath, "r+")

let byte = fs.readFileSync(fffff).at(19337).toString(2).padStart(8, '0').split("")

const bit = 1

byte.splice(7, 1, bit)

const finalByte = parseInt(byte.join(""), 2)

console.log(
    finalByte
)

*/

import fs from 'fs'
import path from 'path';
import { Buffer } from 'buffer';

const fileName = '1637111400214.bmp';

const filePath = path.resolve('src', 'assets', 'tmp', 'encoded', fileName);

const len = fs.readFileSync(filePath).byteLength

console.log(len)

// console.log(fs.readFileSync(filePath).at(19338).toString(2).padStart(8, 0))

let position = len - 1

let count = 0

let recovered = []

while (count < 96) {
    recovered.push(fs
        .readFileSync(filePath)
        .at(position)
        .toString(2)
        .padStart(8, 0)
        .substring(7)
    )

    position--
    count++

}
console.log(recovered)
//0011 0000 //0
//0011 0000
//0011 0000
//0011 0000
//0011 0000
//0011 0000
//0011 0000
//0011 0000
//0011 1001 //9
//0011 0110 //6
//0110 0001//a
//0010 1110//.