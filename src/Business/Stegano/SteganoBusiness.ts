import { Buffer } from 'buffer';
import fs from 'fs';
import path from 'path';
import { embedSteganographyDTO, STEGANO_DTO_KEYS, messageBitArray, requestResult, decodeSteganographyDTO } from '../../Model/Stegano/SteganoModel';


export default class MessageBusiness {
    constructor() { }

    public stringToBitsArray(
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

        const fileName: string = dto[STEGANO_DTO_KEYS.FILE_NAME];
        const message: string = dto[STEGANO_DTO_KEYS.MESSAGE];

        //to do: encrypt msg

        const filePath = path.resolve('src', 'assets', 'tmp', fileName);

        if (!message) {
            throw new Error('Invalid or missing message')
        }


        if (!fileName || !/[a-zA-Z0-9&._-].bmp/.test(fileName) || !filePath) {
            throw new Error('Invalid or missing file name')
        }

        const fileSize: number = fs.readFileSync(filePath).byteLength

        const reservedFileBytes = 142 + 80

        if (message.length * 8 >= fileSize - reservedFileBytes) {
            throw new Error('File has not enough size to have steganography')
        }


        const messageToBitArray = this.stringToBitsArray(
            /[a-zA-Z0-9&._-][.]$/.test(message) ? message : message + '.')

        const totalBytesToWriten = messageToBitArray.length + 80

        const newData = this.stringToBitsArray(
            totalBytesToWriten
                .toString()
                .padStart(10, '0')
        ).concat(messageToBitArray)


        try {

            const newPath = path.resolve('src', 'assets', 'tmp', 'encoded');

            const newFilePath: string = newPath + '/' + Number(new Date()) + '.bmp'

            await fs.promises.copyFile(filePath, newFilePath)


            const startWritePosition = fileSize - totalBytesToWriten

            const newFile = fs.createWriteStream(newFilePath, {
                start: startWritePosition,
                flags: 'r+'
            })

            const rewritenBytes: any = Buffer.alloc(totalBytesToWriten)

            let rewritenBytesPosition: number = totalBytesToWriten - 1

            let fileReadingPosition: number = fileSize - 1

            for (let newBit of newData) {

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



    // public async decodeSteganography(
    //     dto: decodeSteganographyDTO
    // ): Promise<requestResult> {

    //     const fileName = dto[STEGANO_DTO_KEYS.FILE_NAME]

    //     const filePath = path.resolve('src', 'assets', 'tmp', fileName);

    //     if (!fileName || !/[a-zA-Z0-9&._-].bmp/.test(fileName) || !filePath) {
    //         throw new Error('Invalid or missing file name')
    //     }



    // }


}