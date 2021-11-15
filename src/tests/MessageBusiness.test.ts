import MessageBusiness from "../Business/Message/MessageBusiness"

describe('Suit for messageToBitsArray', () => {

    it('Should failed to pass message to bit array', async () => {
        const messageBusiness = new MessageBusiness
        const result = messageBusiness.messageToBitsArray("")

        expect(result).toBe(false)
    })

    it('Should be sucessfully in pass message to bit array', async () => {
        const messageBusiness = new MessageBusiness
        const result: any = messageBusiness.messageToBitsArray("test")

        expect(result).toBeDefined()
        expect(typeof result === 'object').toBe(true)
        expect(result.length).toBeGreaterThanOrEqual(1)
    })



})