import { Request, Response } from "express";
import FileBusiness from "../../Business/File/FileBusiness";
import CustomError from "../../Model/Error/CustomError";
import { FILE_DTO_KEYS, getFileDTO, RequestResult } from "../../Model/File/FileModel";

export class FileController {

    constructor(fileBusiness: FileBusiness) { }


    public async getFile(req: Request, res: Response): Promise<RequestResult | void> {

        try {

            if (!req.query || !req.query[FILE_DTO_KEYS.FILE_NAME]) {
                throw new CustomError(400, `The following queries are needed: '${FILE_DTO_KEYS.FILE_NAME}'`);
            }

            //to-do: req params&query sanitization and validation 

            const dto: getFileDTO = {
                [FILE_DTO_KEYS.FILE_NAME]: req.query[FILE_DTO_KEYS.FILE_NAME] as string
            }

            const result = fileBusiness.getImagePath(dto)

            if (!result.data) {
                throw new CustomError(500, 'Somenthing went wrong')
            }

            return res
                .status(200)
                .download(result.data)


        } catch (error: any) {
            const errorResult = RequestResult.toResponseOutputModel(error.message)

            return res
                .status(error.code || 500)
                .send(errorResult || 'Internal Error')
                .end()
        }

    }


}

const fileBusiness = new FileBusiness()
const fileController = new FileController(fileBusiness)

export default fileController