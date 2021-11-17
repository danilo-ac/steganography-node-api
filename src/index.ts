import express, { Request, Response } from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'
import steganoController from './Controller/Stegano/SteganoController'
import fileController from './Controller/File/FileController'


const app = express()

app.use(cors(), express.json())

export const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server running at ${address.port}`);
    } else {
        console.log('Failed to start the server')
    }
})

app.get("/", (req: Request, res: Response)=>{
    res.status(200).send('Server is succefully running')
})

app.post('/write-message-on-image', steganoController.toEmbedSteganography)
app.get('/decode-message-from-image', steganoController.decodeSteganography)

app.get('/get-image',fileController.getFile)