import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()



export class Authenticator {

    public generateToken(
        input: AuthenticationData,
        expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
    ): string {
        const token = jwt.sign(
            { fileName: input.fileName },
            process.env.JWT_KEY as string,
            { expiresIn }
        )
        return token
    }


    public getData(
        token: string
    ): AuthenticationData {

        try {

            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            ) as any;

            const result = payload.fileName

            return result

        } catch (error: any) {
            throw error
        }
    }


}


export interface AuthenticationData {
    fileName: string,
}