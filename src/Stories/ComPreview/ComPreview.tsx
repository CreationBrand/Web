/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Button, IconButton, Tooltip } from "@mui/material"
import { useRecoilState } from "recoil"
import { activeListData } from "State/Data"
import { heading2, lBold, lNormal, mNormal, normal, sMuted, xBold } from "Stories/Text/Text"
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useNavigate } from "react-router-dom"
const C = {
    container: css({
        width: "100%",
        height: "200px",
        background: '#151618',
        margin: '10px 20px',
        borderRadius: '8px',
        position: 'relative',
    }),
    content: css({
        padding: '24px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        zIndex: 10,
        position: 'relative',
        height: '100%',
    }),
    banner: css({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        borderRadius: '8px',
        zIndex: 1,
    }),
    avatar: css({
        width: "80px",
        height: "80px",
        borderRadius: '8px',
        background: '#0e0e10',
        overflow: 'hidden',
    }),
    image: css({
        height: '80px',
        width: '80px',
        objectFit: 'cover',
    }),
    label: css({
        height: '80px',
        marginLeft: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }),
    end: css({
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    }),
}

const insert = (arr: string | any[], index: any, newItem: any) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]

const ComPreview = ({ title, description, public_id }: any) => {

    // hooks
    const navigate = useNavigate();


    let [activeList, setData]: any = useRecoilState(activeListData)

    const handleShowMore = () => {
        setData(insert(activeList, 0, <div css={C.container}>asdfasdf</div>))
    }

    const handleSettings = () => navigate(`settings`)

    return (

        <div css={C.container} id='COMPREVIEW'>
            <img css={C.banner} src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${public_id}.png`}></img>

            <div css={C.content}>
                <div css={C.avatar}>
                    <img css={C.image} src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${public_id}.png`}></img>

                </div>
                <div css={C.label}>
                    <div>
                        <div css={xBold}>{title}</div>
                        <div css={lNormal}>{description}</div>
                    </div>
                    <div css={sMuted}>10k Members</div>
                </div>
                <div css={C.end}>
                    <Tooltip title="Settings">
                        <IconButton aria-label="delete" size="small" sx={{ width: '30px' }} onClick={handleSettings}>
                            <SettingsRoundedIcon fontSize="small" color="secondary" /></IconButton>
                    </Tooltip>
                    <Button variant="outlined" color='success' size='small' sx={{ borderRadius: '8px' }}>Follow</Button>

                    {/* <Button variant="contained" color='tri' onClick={handleShowMore}>Show More</Button> */}
                </div>
            </div>
        </div>

    )
}



export default ComPreview