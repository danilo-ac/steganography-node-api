import path from 'path'
import fs from 'fs'
import { FILE_DTO_KEYS, getFileDTO, RequestResult } from '../../Model/File/FileModel';



export default class FileBusiness {

    public getImagePath(dto: getFileDTO): RequestResult {

        const fileName = dto[FILE_DTO_KEYS.FILE_NAME]

        const filePath = path.resolve('src', 'assets', 'tmp', 'encoded', fileName);

        if (!fileName || !/[a-zA-Z0-9&._-].bmp/.test(fileName) || !fs.existsSync(filePath)) {
            throw new Error('Invalid or missing file name')
        }

        return RequestResult.toResponseOutputModel('Success to find file', filePath)

    }


}