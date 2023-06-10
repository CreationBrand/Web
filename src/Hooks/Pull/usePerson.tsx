import { useQuery } from "@tanstack/react-query";
import { socketRequest } from "Service/Socket";
import { personData, virtualListStateFamily } from "State/Data";
import PersonHeader from "Stories/Bits/Header/PersonHeader";
import MessengerPane from "Stories/Bits/MessengerPane/MessengerPane";
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";

const usePerson = (person_id: any) => {

    const person = useRecoilValue(personData)



    const { isLoading, isError, data, error } = useQuery({
        queryKey: [person_id],
        queryFn: async () => {
            let req: any = await socketRequest('person', { person_id: person_id })
            if (req === false || req.status === 'error') throw new Error('Network response was not ok')
            return req
        },
    })

    return [isLoading, isError, data?.person ? <PersonHeader {...data.person} /> : null]
}

export default usePerson