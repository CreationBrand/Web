import { socketRequest } from "Service/Socket"



export const vote = async(vote: number, type: string, public_id: string) => {

        const req = await socketRequest('vote', { vote, type, public_id })


        console.log(req)
}


