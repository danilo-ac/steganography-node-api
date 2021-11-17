import express from 'express'
import cors from 'cors'
import steganoController from '../Controller/Stegano/SteganoController'

export const steganoRoutes = express.Router()

steganoRoutes.post('/write-message-on-image', steganoController.toEmbedSteganography)