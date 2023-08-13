/** @jsxImportSource @emotion/react */
import Avatar from '@/components/bits/Avatar';
import { text_1 } from '@/global/var';
import { handleImgError } from '@/utils/stopPropagation';
import { css } from '@emotion/react'




export const CommunityPaneM = () => {



    return (
        <div css={{ padding: '8px' }}>


            <img css={{
                width: '100%',
                height: '80px',
                borderRadius: '8px',
                background: 'white',
            }}
                onError={handleImgError}
                src={`${process.env.REACT_APP_CLOUDFRONT}/banner/8c6dbff9-8117-4642-8fb3-2435e8c0d045`} />

            <div css={{ display: 'flex', background: '#2e3443' }}>

                <Avatar public_id='8c6dbff9-8117-4642-8fb3-2435e8c0d045' size='large' />
                <div css={{
                    fontWeight: 600,
                    fontSize: '28px',
                    color: text_1,
                }}>White People Twitter</div>
            </div>


        </div>)
};