import { requestResult, REQUEST_RESULT_KEYS } from '../Stegano/SteganoModel'

export default class CustomError extends Error {
    constructor(
        public httpStatusCode: number,
        public message: string,
        public quantityError: number,
        public data: any
    ) {
        super(message)
    }


    public mountError() {
        const errorBody: requestResult = {
            [REQUEST_RESULT_KEYS.MESSAGE]: this.message,
            [REQUEST_RESULT_KEYS.DATA]: this.data
        }
        return {
            code: this.httpStatusCode,
            message: errorBody
        }
    }
}