import express from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'

import { routes } from './Routes/routes'

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

app.use(routes)