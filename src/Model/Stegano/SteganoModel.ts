export type messageBitArray = string[]

export enum EMBED_STEGNANO_DTO_KEYS {
    FILE_NAME = 'fileName',
    MESSAGE = 'message'
}

export type embedSteganographyDTO = {
    [EMBED_STEGNANO_DTO_KEYS.FILE_NAME]: string,
    [EMBED_STEGNANO_DTO_KEYS.MESSAGE]: string
}

export enum REQUEST_RESULT_KEYS {
    MESSAGE = 'message',
    DATA = 'data'
}

export class requestResult {

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