import path from 'path'
import fs from 'fs'
import { FILE_DTO_KEYS, getFileDTO, RequestResult } from '../../Model/File/FileModel';
import CustomError from '../../Model/Error/CustomError';



export default class FileBusiness {

    public getImagePath(dto: getFileDTO): RequestResult {

        const fileName = dto[FILE_DTO_KEYS.FILE_NAME]

        const filePath = path.resolve('src', 'assets', 'tmp', 'encoded', fileName);

        if (!fileName || !/[a-zA-Z0-9&._-].bmp/.test(fileName) || !fs.existsSync(filePath)) {
            throw new CustomError(400,'Invalid or missing file name')
        }

        return RequestResult.toResponseOutputModel('Success to find file', filePath)

    }

    public newImageToSave(dto: any): any {

        //to-do: create business to save image; I'll need figure out how handle file with express.

    }

}