/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { motion } from 'framer-motion';


const C = {
    container: css({
        width: '100%',
        height: '50px',
        maxHeight: '50px',
        minHeight: '50px',
        position: 'relative',
    }),
    box: css({
        width: 'min-content',
        margin: '0 auto',
        height: '44px',
        minHeight: '44px',
        maxHeight: '44px',
        background: '#343442',
        borderRadius: '8px',
        display: 'flex',
        marginBottom: '8px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    }),
    inner: css({
        display: 'flex',
        paddingLeft: '12px',
        paddingRight: '12px',
        alignItems: 'center',
        gap: '4px',
        justifyContent: 'space-between',
    }),

}





const PostBar = () => {


    const navigate = useNavigate()

    return (

        <div css={C.container}>


            <motion.div
                key='box'
                layout
                // animate={{y:0}}
                css={C.box}>
                <div css={C.inner}>


asdfasdf
                    <IconButton
                        onMouseDown={() => navigate(`/submit`)}
                        disableRipple={true}
                        size="small"
                        color="secondary"
                        sx={{
                            ':hover': { color: '#fff' },
                            borderRadius: '4px',
                            height: '42px',
                            width: '42px',
                        }}>
                        <AddCircleRoundedIcon
                            fontSize='large'
                        />
                    </IconButton>
                </div>
            </motion.div>
        </div >

    )
}

export default PostBar
