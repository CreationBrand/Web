import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { socketRequest } from 'Service/Socket'
import { commentListData } from 'State/Data'
import DynamicVirtual from 'Stories/Pure/DynamicVirtual/DynamicVirtual'
import Comment from 'Stories/Objects/Comment/Comment'
import { css } from '@emotion/react'
import FilterBar from '../Pane/FilterPane'

const CommentList = ({ header, post_id }: any) => {
    // state
    const [page, setPage] = useState(0)
    const [filter, setFilter] = useState('HOT')
    const [commentList, setCommentList]: any = useRecoilState(commentListData)

    // effects
    useEffect(() => {
        ;(async () => {
            let req: any = await socketRequest('comments', {
                post_id: post_id,
                filter: filter,
                page: 0
            })
            if (req.status === 'ok') {
                let comments = []
                for (var i in req.comments) {
                    comments.push(<Comment data={req.comments[i]} />)
                }
                if (page === 0) await setCommentList(comments)
                else await setCommentList([...commentList, comments])
            }
        })()
    }, [post_id,filter])


    return (
        <div id="Comment-List" css={css({ marginTop: '12px'})}>
            <DynamicVirtual
                rows={[
                    header,
                    <FilterBar value={filter} onChange={setFilter} />,
                    ...commentList
                ]}
            />
        </div>
    )
}

export default CommentList
