import path from 'path'
import fs from 'fs'
import { FILE_DTO_KEYS, getFileDTO, RequestResult } from '../../Model/File/FileModel';
import CustomError from '../../Model/Error/CustomError';
import multer, { DiskStorageOptions, Multer, Options, StorageEngine } from 'multer';


export default class FileBusiness {

    public getImagePath(dto: getFileDTO): RequestResult {

        const fileName = dto[FILE_DTO_KEYS.FILE_NAME]

        const filePath = path.resolve('src', 'assets', 'tmp', 'encoded', fileName);

        if (!fileName || !/[a-zA-Z0-9&._-].bmp/.test(fileName) || !fs.existsSync(filePath)) {
            throw new CustomError(400, 'Invalid or missing file name')
        }

        return RequestResult.toResponseOutputModel('Success to find file', filePath)

    }


    public saveFileConfig(): Options {

        const localStorageConfig: StorageEngine = multer.diskStorage({
            destination: (req, file, pathToSave) => {
                pathToSave(null, path.resolve('src', 'assets', 'tmp'))
            },

            filename: (req, file, newFileName) => {
                const newName = `${Number(new Date())}${file.originalname}`
                newFileName(null, newName)
            }
        })


        const config: Options = {
            dest: path.resolve('src', 'assets', 'tmp'),
            storage: localStorageConfig,
            limits: {
                fileSize: 1024 * 1024 * 500 //524MBytes
            },
            fileFilter: (req, file, allowedFileType) => {
                const allowedFiles = ['image/bmp']
                if (allowedFiles.includes(file.mimetype)) {
                    allowedFileType(null, true)
                } else {
                    allowedFileType(new CustomError(406, 'Invalid file type. Only bitmap image is allowed.'))
                }

            }
        }

        return config

    }


}