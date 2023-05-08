
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { textBold, textLight } from 'Global/Mixins'
import Avatar from 'Stories/Bits/Avatar/Avatar'


const C = {
    container: css({
        width: '100%',
        paddingBottom: '12px',
        background: '#343442',
        borderRadius: '8px',
        position: 'relative',
    }),
    banner: css({
        width: '100%',
        height: '140px',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
        objectFit: 'cover',
        zIndex: 10,
    }),
    iconWrapper: css({
        position: 'absolute',
        borderRadius: '16px',
        background: '#343442',
        top: '60%',
        left: '12px',
        padding: '4px',

    }),
    content: css({
        position: 'relative',
        top: '-2px',
        lineHeight: '20px',
        padding: '0px 8px 0px 82px',
    }),
    // float: css({
    //     margin: 'auto',
    //     top: '60%',
    //     position: 'relative',
    //     borderRadius: '8px',
    //     background:'#343442',
    //     width: '80%',
    //     height: '60px',
    //     zIndex: 100,
    //     maxWidth: '400px',
    //     boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    // }),
}

const MainPane = ({ data }: any) => {

    console.log(data)


    return (
        <div css={C.container}>
            {/* https://artram.s3.amazonaws.com/banner/${data.public_id}.svg */}
            <img css={C.banner} src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${data.public_id}.svg`} />

            <div css={C.iconWrapper}>
                <Avatar size='large' public_id={data.public_id} />
            </div>

            <div css={C.content}>
                <div css={textBold('l')}>{data.title}</div>
                <div css={[textLight('s')]}>{data.description === undefined ? data.description : 'A non-descript community.'}</div>


            </div>
            {/* <div css={C.float}>asdfasdf</div> */}
        </div>
    )
}


export default MainPane