import { useQuery } from "@tanstack/react-query";
import { socketRequest } from "Service/Socket";
import { personData, virtualListStateFamily } from "State/Data";
import MessengerPane from "Stories/Bits/MessengerPane/MessengerPane";
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";

const useMessenger = (messenger_id: any) => {

    const person = useRecoilValue(personData)

    const setListItems = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            set(virtualListStateFamily(`messenger:${listItems.messenger.public_id}`), listItems.messenger);
        },
        []
    );


    const { isLoading, isError, data, error } = useQuery({
        queryKey: [messenger_id],
        queryFn: async () => {


            let req: any = await socketRequest('messenger', {
                messenger_id: messenger_id,
            })

            if (req === false || req.status === 'error') throw new Error('Network response was not ok')

            return req
        },
        onSuccess: (data) => {
            if (!data || data === undefined) return
            setListItems(data)
        },
    })

    let status = 'pending'
    try {

        const you = data.messenger.members.filter((item: any) => item.person.public_id === person.public_id)
        // const other = data.messenger.members.filter((item: any) => item.person.public_id !== person.public_id)
        status = you[0].messenger_member.status
    } catch (e) { }

    return [isLoading, isError, <MessengerPane messenger_id={data?.messenger?.public_id} status={status} />, data, status];
}

export default useMessenger 