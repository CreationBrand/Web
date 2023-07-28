import PersonHeader from "@/components/chunks/Header/PersonHeader";
import { useQuery } from "@tanstack/react-query";

import { useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from "./util/useSocket";

const usePerson = (person_id: any) => {


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