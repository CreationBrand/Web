import { socketRequest } from "Service/Socket"



export const vote = async (vote: number, type: string, public_id: string) => {

        const req = await socketRequest('vote', { vote, type, public_id })

        console.log(req)
}

export const createMessage = async (messenger_id: any, message: any) => {

        console.log(messenger_id, message)
        const req = await socketRequest('new-message', { messenger_id: messenger_id, content: message })
        console.log(req)
}
