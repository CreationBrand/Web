


import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { socketRequest } from 'Service/Socket'
import { commentListData } from 'State/Data'
import DynamicVirtual from 'Stories/Pure/DynamicVirtual/DynamicVirtual'
import Comment from 'Stories/Objects/Comment/Comment'
import { css } from '@emotion/react'
import FilterBar from '../Pane/FilterPane'
import Message from 'Stories/Objects/Message/Message'

const MessageList = ({ messenger_id }: any) => {

    // state
    const [page, setPage] = useState(0)
    const [commentList, setCommentList]: any = useRecoilState(commentListData)

    // effects
    useEffect(() => {
        ;(async () => {
            let req: any = await socketRequest('messages', {
                messenger_id: messenger_id,
                page: 0
            })
            console.log(req)
            if (req.status === 'ok') {
                let items = []
                for (var i in req.messages) {
                    items.push(<Message props={req.messages[i]} />)
                }
                if (page === 0) await setCommentList(items)
                else await setCommentList([...commentList, items])
            }
        })()
    }, [messenger_id])


    return (
        <div id="Messages-List" css={css({ marginTop: '12px'})}>
            <DynamicVirtual
                rows={[
                    ...commentList
                ]}
            />
        </div>
    )
}

export default MessageList
