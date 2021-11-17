import FileBusiness from "../Business/File/FileBusiness"
import { FILE_DTO_KEYS, getFileDTO, RequestResult } from "../Model/File/FileModel"

describe('Suit for "getImagePath"', () => {

    it('Should failed for empty fileName', () => {

        const failedDTO: getFileDTO = {
            [FILE_DTO_KEYS.FILE_NAME]: ''
        }

        const fileBusiness = new FileBusiness

        try {
            fileBusiness.getImagePath(failedDTO)
        } catch (error: any) {
            expect(error.message).toEqual('Invalid or missing file name')
        }

    })


    it('Should failed for invalid fileName extension', () => {

        const failedDTO: getFileDTO = {
            [FILE_DTO_KEYS.FILE_NAME]: 'encoded_test.png'
        }

        const fileBusiness = new FileBusiness

        try {
            fileBusiness.getImagePath(failedDTO)
        } catch (error: any) {
            expect(error.message).toEqual('Invalid or missing file name')
        }

    })


    it('Should failed for inexistent fileName', () => {

        const failedDTO: getFileDTO = {
            [FILE_DTO_KEYS.FILE_NAME]: 'inexistent.bmp'
        }

        const fileBusiness = new FileBusiness

        try {
            fileBusiness.getImagePath(failedDTO)
        } catch (error: any) {
            expect(error.message).toEqual('Invalid or missing file name')
        }

    })


    it('Should be successfully for a valid fileName', () => {

        const failedDTO: getFileDTO = {
            [FILE_DTO_KEYS.FILE_NAME]: 'encoded_test.bmp'
        }

        const fileBusiness = new FileBusiness

        try {
            const result: RequestResult = fileBusiness.getImagePath(failedDTO)

            console.log(result)
            expect(result.message).toEqual('Success to find file')
            expect(result.data).toMatch(/[\/a-zA-Z0-9&._-]encoded_test.bmp/)

        } catch (error: any) {
            console.error('Should be successfully for a valid fileName',
                error)
        }

    })

})