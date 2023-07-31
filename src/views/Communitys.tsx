/** @jsxImportSource @emotion/react */
import Avatar from '@/components/bits/Avatar';

import { baseList, header } from '@/global/mixins';
import { bg_3, shadow_1 } from '@/global/var';
import useAllCommunitys from '@/hooks/list/useAllCommunitys';
import useWindow from '@/hooks/util/useWindow';
import { layoutSize } from '@/state/layout';
import { handleImgError } from '@/utils/stopPropagation';
import { css } from '@emotion/react';

import { Masonry } from '@mui/lab';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Outlet, useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import rehypeRaw from 'rehype-raw';


const Communitys = () => {

    const [isLoading, isError, components] = useAllCommunitys()
    const { width, height } = useWindow()
    const layout = useRecoilValue(layoutSize)

    return (
        <motion.div
            key={'communitys'}
            css={baseList}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
        >

            <Outlet />



            <div css={{
                overflowY: 'scroll',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '8px',
                touchAction: 'pan-y',
            }}>
                <Masonry
                    sx={{
                        width: '100% !important',
                    }}
                    columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
                    defaultHeight={400}
                    spacing={2}
                >
                    {components.map((data: any, index: any) => (
                        <Community key={index} {...data} />

                    ))}
                </Masonry>

            </div>
        </motion.div>
    )

}


export default Communitys




const C = {
    container: css({
        minwidth: '240px',
        width: '100%',
        maxWidth: '400px !important',
        background: bg_3,
        borderRadius: '12px',
        boxShadow: shadow_1,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 0 11px rgba(0,0,0,.8)',
        },
    }),
    banner: css({
        width: '100%',
        zIndex: 10,
        cursor: 'pointer',
        height: '60px',
        borderRadius: '8px',
        objectFit: 'cover',
    }),
}



const Community = ({ description, public_id, title, ...props }: any) => {

    const navigate = useNavigate()

    const onClick = () => {
        navigate(`/c/${public_id}`)
    }

    return <div css={C.container} onClick={onClick}>

        <img css={C.banner} onError={handleImgError} src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${public_id}`} />

        <div css={{ display: 'flex', padding: '8px', alignItems: 'center', gap: '8px' }}>
            <Avatar public_id={public_id} size='small'></Avatar>
            <div css={header}>{title}</div>
        </div>

        {description && <div css={{ padding: '8px 8px 12px 8px' }}>
            <ReactMarkdown className='text' children={description} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
        </div>}

    </div>
}