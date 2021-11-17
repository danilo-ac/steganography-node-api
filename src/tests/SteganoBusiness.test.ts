import SteganoBusiness from "../Business/Stegano/SteganoBusiness"
import { decodeSteganographyDTO, embedSteganographyDTO, STEGANO_DTO_KEYS } from "../Model/Stegano/SteganoModel"

let encondedFile: string = ''
let toEncodeMessage: string = 'In computing, the least significant bit (LSB) is the bit position in a binary integer giving the units value, that is, determining whether the number is even or odd. The LSB is sometimes referred to as the low-order bit or right-most bit, due to the convention in positional notation of writing less significant digits further to the right. It is analogous to the least significant digit of a decimal integer, which is the digit in the ones (right-most) position.It is common to assign each bit a position number, ranging from zero to N-1, where N is the number of bits in the binary representation used. Normally, the bit number is simply the exponent for the corresponding bit weight in base-2 (such as in 231..20). A few CPU manufacturers have assigned bit numbers the opposite way (which is not the same as different endianness). In any case, the least significant bit itself remains unambiguous as the unit bit.'


describe('Suit for "stringToBitsArray"', () => {

    it('Should failed to pass message to bit array', async () => {

        expect.assertions(1)

        const steganoBusiness = new SteganoBusiness

        try {

            steganoBusiness.stringToBitsArray("")

        } catch (error: any) {

            expect(error?.message).toEqual("No input received")
        }
    })



    it('Should be sucessfully in pass message to bit array', async () => {
        const steganoBusiness = new SteganoBusiness
        const result: any = steganoBusiness.stringToBitsArray("test")

        expect(result).toBeDefined()
        expect(typeof result === 'object').toBe(true)
        expect(result.length).toBeGreaterThanOrEqual(1)
    })

})



describe('Suit for "toEmbedSteganography"', () => {

    it('Should failed for empty message', async () => {

        expect.assertions(1)

        const failedDTO: embedSteganographyDTO = {
            [STEGANO_DTO_KEYS.MESSAGE]: '',
            [STEGANO_DTO_KEYS.FILE_NAME]: ''
        }

        const steganoBusiness = new SteganoBusiness

        try {
            await steganoBusiness.toEmbedSteganography(failedDTO)
        } catch (error: any) {
            expect(error.message).toEqual('Invalid or missing message')
        }

    })


    it('Should failed for empty fileName', async () => {

        expect.assertions(1)

        const failedDTO: embedSteganographyDTO = {
            [STEGANO_DTO_KEYS.MESSAGE]: 'a',
            [STEGANO_DTO_KEYS.FILE_NAME]: ''
        }

        const steganoBusiness = new SteganoBusiness

        try {
            await steganoBusiness.toEmbedSteganography(failedDTO)
        } catch (error: any) {
            expect(error.message).toEqual('Invalid or missing file name')
        }

    })


    it('Should failed for invalid fileName extension', async () => {

        expect.assertions(1)

        const failedDTO: embedSteganographyDTO = {
            [STEGANO_DTO_KEYS.MESSAGE]: 'a',
            [STEGANO_DTO_KEYS.FILE_NAME]: 'test.jpeg'
        }

        const steganoBusiness = new SteganoBusiness

        try {
            await steganoBusiness.toEmbedSteganography(failedDTO)
        } catch (error: any) {
            expect(error.message).toEqual('Invalid or missing file name')
        }

    })


    it('Should failed for inexistent fileName', async () => {

        expect.assertions(1)

        const failedDTO: embedSteganographyDTO = {
            [STEGANO_DTO_KEYS.MESSAGE]: 'a',
            [STEGANO_DTO_KEYS.FILE_NAME]: 'inexistentFile.bmp'
        }

        const steganoBusiness = new SteganoBusiness

        try {
            await steganoBusiness.toEmbedSteganography(failedDTO)
        } catch (error: any) {
            expect(error.message).toEqual('Invalid or missing file name')
        }

    })



    it('Should failed for file sizeless for write', async () => {

        expect.assertions(1)

        const bigMsg: string = 'a'.repeat(100)

        const failedDTO: embedSteganographyDTO = {
            [STEGANO_DTO_KEYS.MESSAGE]: bigMsg,
            [STEGANO_DTO_KEYS.FILE_NAME]: 'tiny.bmp'
        }

        const steganoBusiness = new SteganoBusiness

        try {
            await steganoBusiness.toEmbedSteganography(failedDTO)
        } catch (error: any) {
            expect(error.message).toEqual('File has not enough size to have steganography')
        }

    })



    it('Should be sucessfully in create steganography', async () => {

        const dto: embedSteganographyDTO = {
            [STEGANO_DTO_KEYS.MESSAGE]: toEncodeMessage,
            [STEGANO_DTO_KEYS.FILE_NAME]: 'test.bmp'
        }

        const steganoBusiness = new SteganoBusiness

        try {

            const result = await steganoBusiness.toEmbedSteganography(dto)

            encondedFile = result.data as string

            expect(result).toBeDefined()
            expect(result?.message).toBeTruthy()
            expect(result?.data).toMatch(/[a-zA-Z0-9&._-].bmp/)
        } catch (error: any) {
            console.error('Should be sucessfully in create steganography',
                error)
        }

    })

})



describe('Suit for "decodeSteganography"', () => {

    it('Should failed for empty file name', async () => {

        expect.assertions(1)

        const failedDTO: decodeSteganographyDTO = {
            [STEGANO_DTO_KEYS.FILE_NAME]: ''
        }

        const steganoBusiness = new SteganoBusiness

        try {
            await steganoBusiness.decodeSteganography(failedDTO)
        } catch (error: any) {
            expect(error.message).toEqual('Invalid or missing file name')
        }

    })


    it('Should failed for invalid fileName extension', async () => {

        expect.assertions(1)

        const failedDTO: decodeSteganographyDTO = {
            [STEGANO_DTO_KEYS.FILE_NAME]: 'test.jpeg'
        }

        const steganoBusiness = new SteganoBusiness

        try {

            await steganoBusiness.decodeSteganography(failedDTO)

        } catch (error: any) {
            expect(error.message).toEqual('Invalid or missing file name')
        }

    })


    it('Should failed for inexistent fileName', async () => {

        expect.assertions(1)

        const failedDTO: decodeSteganographyDTO = {
            [STEGANO_DTO_KEYS.FILE_NAME]: 'inexistent.bmp'
        }

        const steganoBusiness = new SteganoBusiness

        try {
            await steganoBusiness.decodeSteganography(failedDTO)
        } catch (error: any) {
            expect(error.message).toEqual('Invalid or missing file name')
        }

    })


    it('Should be sucessfully in decode steganography', async () => {

        const dto: decodeSteganographyDTO = {
            [STEGANO_DTO_KEYS.FILE_NAME]: encondedFile
        }

        const steganoBusiness = new SteganoBusiness

        try {

            const result = await steganoBusiness.decodeSteganography(dto)

            expect(result).toBeDefined()
            expect(result.message).toBeTruthy()
            expect(result.data).toEqual(toEncodeMessage)

        } catch (error: any) {
            console.error('Should be sucessfully in decode steganography',
                error)
        }

    })

})