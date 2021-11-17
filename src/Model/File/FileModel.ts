export enum FILE_DTO_KEYS {
    FILE_NAME = 'fileName',
}

export type getFileDTO = {
    [FILE_DTO_KEYS.FILE_NAME]: string,
}


export enum REQUEST_RESULT_KEYS {
    MESSAGE = 'message',
    DATA = 'data'
}

export class RequestResult {

    public [REQUEST_RESULT_KEYS.MESSAGE]: string
    public [REQUEST_RESULT_KEYS.DATA]?: null | string //to do: make signatures

    static toResponseOutputModel(
        message: string,
        data?: any
    ) {
        return {
            [REQUEST_RESULT_KEYS.MESSAGE]: message,
            [REQUEST_RESULT_KEYS.DATA]: data ?? ''
        }
    }


}