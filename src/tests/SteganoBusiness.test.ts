import SteganoBusiness from "../Business/Stegano/SteganoBusiness"
import { decodeSteganographyDTO, embedSteganographyDTO, STEGANO_DTO_KEYS } from "../Model/Stegano/SteganoModel"

describe('Suit for stringToBitsArray', () => {

//     it('Should failed to pass message to bit array', async () => {
//         const steganoBusiness = new SteganoBusiness

//         try {

//             steganoBusiness.stringToBitsArray("")

//         } catch (error: any) {

//             expect(error?.message).toEqual("No input received")
//         }
//     })

//     it('Should be sucessfully in pass message to bit array', async () => {
//         const steganoBusiness = new SteganoBusiness
//         const result: any = steganoBusiness.stringToBitsArray("test")

//         expect(result).toBeDefined()
//         expect(typeof result === 'object').toBe(true)
//         expect(result.length).toBeGreaterThanOrEqual(1)
//     })

})


describe('Suit for "toEmbedSteganography"', () => {

//     it('Should failed for empty message', async () => {

//         expect.assertions(1)

//         const failedDTO: embedSteganographyDTO = {
//             [STEGANO_DTO_KEYS.MESSAGE]: '',
//             [STEGANO_DTO_KEYS.FILE_NAME]: ''
//         }

//         const steganoBusiness = new SteganoBusiness

//         try {
//             const result = await steganoBusiness.toEmbedSteganography(failedDTO)
//         } catch (error: any) {
//             expect(error.message).toEqual('Invalid or missing message')
//         }

//     })

//     it('Should failed for empty fileName', async () => {

//         expect.assertions(1)

//         const failedDTO: embedSteganographyDTO = {
//             [STEGANO_DTO_KEYS.MESSAGE]: 'a',
//             [STEGANO_DTO_KEYS.FILE_NAME]: ''
//         }

//         const steganoBusiness = new SteganoBusiness

//         try {
//             const result = await steganoBusiness.toEmbedSteganography(failedDTO)
//         } catch (error: any) {
//             expect(error.message).toEqual('Invalid or missing file name')
//         }

//     })

//     it('Should failed for invalid fileName extension', async () => {

//         expect.assertions(1)

//         const failedDTO: embedSteganographyDTO = {
//             [STEGANO_DTO_KEYS.MESSAGE]: 'a',
//             [STEGANO_DTO_KEYS.FILE_NAME]: 'test.jpeg'
//         }

//         const steganoBusiness = new SteganoBusiness

//         try {
//             const result = await steganoBusiness.toEmbedSteganography(failedDTO)
//         } catch (error: any) {
//             expect(error.message).toEqual('Invalid or missing file name')
//         }

//     })

//     it('Should failed for inexistent fileName', async () => {

//         expect.assertions(1)

//         const failedDTO: embedSteganographyDTO = {
//             [STEGANO_DTO_KEYS.MESSAGE]: 'a',
//             [STEGANO_DTO_KEYS.FILE_NAME]: 'inexistentFile.bmp'
//         }

//         const steganoBusiness = new SteganoBusiness

//         try {
//             const result = await steganoBusiness.toEmbedSteganography(failedDTO)
//         } catch (error: any) {
//             expect(error.message).toEqual('Invalid or missing file name')
//         }

//     })


//     it('Should failed for file sizeless for write', async () => {

//         expect.assertions(1)

//         const bigMsg: string = 'a'.repeat(1000024)

//         const failedDTO: embedSteganographyDTO = {
//             [STEGANO_DTO_KEYS.MESSAGE]: bigMsg,
//             [STEGANO_DTO_KEYS.FILE_NAME]: 'teste.bmp'
//         }

//         const steganoBusiness = new SteganoBusiness

//         try {
//             const result = await steganoBusiness.toEmbedSteganography(failedDTO)
//         } catch (error: any) {
//             expect(error.message).toEqual('File has not enough size to have steganography')
//         }

//     })


    // it('Should be sucessfully in create steganography', async () => {

    //     const dto: embedSteganographyDTO = {
    //         [STEGANO_DTO_KEYS.MESSAGE]: 'Código Padrão Americano para o Intercâmbio de Informação (do inglês American Standard Code for Information Interchange - ASCII, pronunciado [áski]) é um sistema de representação de letras, algarismos e sinais de pontuação e de controle, através de um sinal codificado em forma de código binário (cadeias de bits formada por vários 0 e 1), desenvolvido a partir de 1960, que representa um conjunto de 128 sinais: 95 sinais gráficos (letras do alfabeto latino, algarismos arábicos, sinais de pontuação e sinais matemáticos) e 33 sinais de controle, utilizando 7 bits para representar todos os seus símbolos.',
    //         [STEGANO_DTO_KEYS.FILE_NAME]: 'teste.bmp'
    //     }

    //     const steganoBusiness = new SteganoBusiness

    //     try {

    //         const result = await steganoBusiness.toEmbedSteganography(dto)

    //         expect(result).toBeDefined()
    //         expect(result.message).toBeTruthy()

    //     } catch (error: any) {
    //         console.error(error)
    //     }

    // })

})

describe('Suit for "decodeSteganography"', () => {

    // it('Should failed for empty file name', async () => {

    //     expect.assertions(1)

    //     const failedDTO: decodeSteganographyDTO = {
    //         [STEGANO_DTO_KEYS.FILE_NAME]: ''
    //     }

    //     const steganoBusiness = new SteganoBusiness

    //     try {
    //         const result = await steganoBusiness.decodeSteganography(failedDTO)
    //     } catch (error: any) {
    //         expect(error.message).toEqual('Invalid or missing file name')
    //     }

    // })

    // it('Should failed for invalid fileName extension', async () => {

    //     expect.assertions(1)

    //     const failedDTO: decodeSteganographyDTO = {
    //         [STEGANO_DTO_KEYS.FILE_NAME]: 'test.jpeg'
    //     }

    //     const steganoBusiness = new SteganoBusiness

    //     try {
    //         const result = await steganoBusiness.decodeSteganography(failedDTO)
    //     } catch (error: any) {
    //         expect(error.message).toEqual('Invalid or missing file name')
    //     }

    // })

    // it('Should failed for inexistent fileName', async () => {

    //     expect.assertions(1)

    //     const failedDTO: decodeSteganographyDTO = {
    //         [STEGANO_DTO_KEYS.FILE_NAME]: 'inexistent.bmp'
    //     }

    //     const steganoBusiness = new SteganoBusiness

    //     try {
    //         const result = await steganoBusiness.decodeSteganography(failedDTO)
    //     } catch (error: any) {
    //         expect(error.message).toEqual('Invalid or missing file name')
    //     }

    // })

    it('Should be sucessfully in decode steganography', async () => {

        const dto: decodeSteganographyDTO = {
            [STEGANO_DTO_KEYS.FILE_NAME]: 'encoded_test.bmp'
        }

        const steganoBusiness = new SteganoBusiness

        try {

            const result = await steganoBusiness.decodeSteganography(dto)

            expect(result).toBeDefined()
            expect(result.message).toBeTruthy()

        } catch (error: any) {
            console.error(error)
        }

    })

})