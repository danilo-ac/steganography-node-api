import { Request, Response } from "express";
import multer from "multer";
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


    public async uploadFile(req: Request, res: Response): Promise<RequestResult | void> {

        try {

            const multerConfig = new FileBusiness().saveFileConfig()
            const upload = multer(multerConfig).single('file')

            upload(req, res, function (err) {

                try {

                    if (err instanceof multer.MulterError) {
                        throw err
                    } else if (err) {
                        throw err
                    }

                    try {

                        const result: RequestResult = RequestResult
                            .toResponseOutputModel('Success to upload. File name in data:', req.file?.filename)

                        return res
                            .status(200)
                            .send(result)
                            .end()


                    } catch (error: any) {

                        const errorResult = RequestResult.toResponseOutputModel(error.message)

                        return res
                            .status(error.code || 500)
                            .send(errorResult || 'Internal Error')
                            .end()
                    }


                } catch (error: any) {
                    const errorResult = RequestResult.toResponseOutputModel(error.message)

                    return res
                        .status(error.code || 500)
                        .send(errorResult)
                        .end()
                }

            })

        } catch (error: any) {
            return res
                .status(error.code || 500)
                .send(error.message || 'Internal Error')
                .end()
        }
    }


}

const fileBusiness = new FileBusiness()
const fileController = new FileController(fileBusiness)

export default fileController