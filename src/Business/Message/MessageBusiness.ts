import { Buffer } from 'buffer'
import { messageBitArray } from '../../Model/Message/MessageModel';


export default class MessageBusiness {
    constructor() { }

    public messageToBitsArray(input: string) {

        if (!input) {
            return false
        }

        const message = input

        const bitsArray: messageBitArray = []

        for (let i = 0; i < message.length; i++) {
            message
                .charCodeAt(i)
                .toString(2)
                .padStart(8, '0')
                .split('')
                .forEach((element: string): void => {
                    bitsArray.push(element)
                });
        }
        return bitsArray
    }

}