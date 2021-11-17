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

        if (!fileName || !/[a-zA-Z0-9&._-].bmp/.test(fileName) || !fs.existsSync(filePath)) {
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

            const newFileName = Number(new Date()) + '.bmp'
            const newFilePath = path.resolve('src', 'assets', 'tmp', 'encoded', newFileName);

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

            return requestResult.toResponseOutputModel('Success to encode. A new image was generated', newFileName)

        } catch (error: any) {
            throw error
        }

    };



    public async decodeSteganography(
        dto: decodeSteganographyDTO
    ): Promise<requestResult> {

        const fileName = dto[STEGANO_DTO_KEYS.FILE_NAME]

        const filePath = path.resolve('src', 'assets', 'tmp', 'encoded', fileName);

        if (!fileName || !/[a-zA-Z0-9&._-].bmp/.test(fileName) || !fs.existsSync(filePath)) {
            throw new Error('Invalid or missing file name')
        }


        try {

            const fileSize: number = fs.readFileSync(filePath).byteLength

            let encodedBytesToRead: number = fileSize - 1

            let recoveredBits: any[] = []

            const encodedHeaderByteLength = 80
            const decodedHeaderByteLength = 10

            for (let i = 0; i < encodedHeaderByteLength; i++) {
                recoveredBits.push(fs.readFileSync(filePath)
                    .at(encodedBytesToRead)
                    ?.toString(2)
                    .padStart(8, '0')
                    .substring(7))

                encodedBytesToRead--
            }

            let totalEncodedBytes: any = []

            for (let i = 0; totalEncodedBytes.length < decodedHeaderByteLength; i += 8) {
                const slices = recoveredBits.slice(i, i + 8).join('')
                totalEncodedBytes.push(slices)
            }

            totalEncodedBytes = Number(totalEncodedBytes
                .map((item: any) => {
                    return String.fromCharCode(parseInt(item, 2))
                })
                .join(""));




            encodedBytesToRead = totalEncodedBytes - encodedHeaderByteLength

            let finalReadingPosition: number = fileSize - totalEncodedBytes - 1

            let startReadingPosition: number = fileSize - encodedHeaderByteLength - 1

            recoveredBits = []

            for (let i = startReadingPosition;
                i > finalReadingPosition;
                i--
            ) {
                recoveredBits.push(fs.readFileSync(filePath)
                    .at(i)
                    ?.toString(2)
                    .padStart(8, '0')
                    .substring(7))
            }

            let recoveredMessage: any = []


            for (let i = 0; recoveredMessage.length < encodedBytesToRead / 8; i += 8) {
                const slices = recoveredBits.slice(i, i + 8).join('')
                recoveredMessage.push(slices)
            }

            recoveredMessage = recoveredMessage
                .map((item: any) => {
                    return String.fromCharCode(parseInt(item, 2))
                })
                .join("")


            if (recoveredMessage.substring(recoveredMessage.length - 1) !== ".") {
                throw new Error("Failed to decode. Something went wrong")
            }

            return requestResult.toResponseOutputModel('Success to decode message', recoveredMessage)

        } catch (error) {
            throw error
        }
    }



}