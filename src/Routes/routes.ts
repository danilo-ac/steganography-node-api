import express, { Request, Response } from 'express'
import steganoController from '../Controller/Stegano/SteganoController'
import fileController from '../Controller/File/FileController'


export const routes = express.Router()

routes.get("/", (req: Request, res: Response) => {
    res.status(200).send('Server is succefully running')
})

routes.post('/write-message-on-image', steganoController.toEmbedSteganography)
routes.get('/decode-message-from-image', steganoController.decodeSteganography)

routes.get('/get-image', fileController.getFile)

routes.post('/upload', fileController.uploadFile)