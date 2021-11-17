import { Request, Response } from 'express'
import SteganoBusiness from '../../Business/Stegano/SteganoBusiness'
import { embedSteganographyDTO, requestResult, STEGANO_DTO_KEYS } from '../../Model/Stegano/SteganoModel'



export class SteganoController {
    constructor(private steganoBusiness: SteganoBusiness) { }

    public async toEmbedSteganography(req: Request, res: Response): Promise<requestResult | void> {

        try {

            if (!req.body || !req.body[STEGANO_DTO_KEYS.FILE_NAME || !req.body[STEGANO_DTO_KEYS.MESSAGE]]) {
                throw new Error(`The following keys are needed: '${[STEGANO_DTO_KEYS.FILE_NAME]}' '${[STEGANO_DTO_KEYS.MESSAGE]}'`)
            }

            //to-do: req.body sanitization and validation 

            const dto: embedSteganographyDTO = {
                [STEGANO_DTO_KEYS.FILE_NAME]: req.body[STEGANO_DTO_KEYS.FILE_NAME],
                [STEGANO_DTO_KEYS.MESSAGE]: req.body[STEGANO_DTO_KEYS.MESSAGE]
            }

            const result: requestResult = await steganoBusiness.toEmbedSteganography(dto)

            return res
                .status(200)
                .send(result)
                .end()

        } catch (error: any) {

            const errorResult: requestResult = requestResult.toResponseOutputModel(error.message)

            return res
                .status(error.code ?? 400) //to-do: make custom Error for better http codes
                .send(errorResult ?? 'Internal Error')
                .end()
        }
    }


}

const steganoBusiness = new SteganoBusiness()
const steganoController = new SteganoController(steganoBusiness)

export default steganoController