import { socketRequest } from "./Socket";




export const openDM = async (person_id: string) => {


    console.log('openDM', person_id)


    let req = await socketRequest('messenger-new', { person_id: person_id })

    console.log(req)
};