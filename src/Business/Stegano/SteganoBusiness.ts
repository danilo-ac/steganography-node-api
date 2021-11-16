import { Buffer } from 'buffer';
import fs from 'fs';
import path from 'path';
import { embedSteganographyDTO, EMBED_STEGNANO_DTO_KEYS, messageBitArray, requestResult } from '../../Model/Stegano/SteganoModel';


export default class MessageBusiness {
    constructor() { }

    public messageToBitsArray(
        input: string
    ): messageBitArray {

        if (!input) {
            throw new Error('No input received');
        }

        const message = input;

        const bitsArray: messageBitArray = [];

        for (let i = 0; i < message.length; i++) {
            message
                .charCodeAt(i)
                .toString(2)
                .padStart(8, '0')
                .split('')
                .forEach((element: string): void => {
                    bitsArray.push(element)
                });
        };

        return bitsArray;
    };

    private isValidEmbedSteganographyDTO() { }; //to do

    public async toEmbedSteganography(
        dto: embedSteganographyDTO
    ): Promise<requestResult> {

        //to do: dto validation

        const fileName: string = dto[EMBED_STEGNANO_DTO_KEYS.FILE_NAME];
        const message: string = dto[EMBED_STEGNANO_DTO_KEYS.MESSAGE];

        //to do: encrypt msg

        const filePath = path.resolve('src', 'assets', 'tmp', fileName);
        console.log(!!filePath)

        if (!message) {
            throw new Error('Invalid or missing message')
        }


        if (!fileName || !/[a-zA-Z0-9&._-].bmp/.test(fileName) || !filePath) {
            throw new Error('Invalid or missing file name')
        }

        const fileSize: number = fs.readFileSync(filePath).byteLength

        if (message.length * 8 >= fileSize - 142) {
            throw new Error('File has not enough size to have steganography')
        }

        const messageInBitArray = this.messageToBitsArray(message)

        try {

            const newPath = path.resolve('src', 'assets', 'tmp', 'encoded');

            const newFilePath: string = newPath + '/' + Number(new Date()) + '.bmp'

            await fs.promises.copyFile(filePath, newFilePath)


            const startWritePosition = fileSize - messageInBitArray.length

            const newFile = fs.createWriteStream(newFilePath, {
                start: startWritePosition,
                flags: 'r+'
            })

            const rewritenBytes: any = Buffer.alloc(messageInBitArray.length)

            let rewritenBytesPosition: number = messageInBitArray.length - 1

            let fileReadingPosition: number = fileSize - 1


            for (let newBit of messageInBitArray) {

                let byteToBitReplace: any[] = (await fs.promises.readFile(newFilePath))
                    .at(fileReadingPosition)?.toString(2)
                    .padStart(8, '0')
                    .split("") ?? [0, 0, 0, 0, 0, 0, 0, 0]

                byteToBitReplace[7] = newBit

                rewritenBytes[rewritenBytesPosition] = parseInt(byteToBitReplace.join(""), 2)

                rewritenBytesPosition--
                fileReadingPosition--
            }


            newFile.write(rewritenBytes)

            newFile.end()


            return requestResult.toResponseOutputModel('Success') // to do: also inform the new file name

        } catch (error: any) {
            throw error
        }

    };



}