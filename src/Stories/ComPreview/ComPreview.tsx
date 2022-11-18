/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Button, IconButton, Tooltip } from "@mui/material"
import { useRecoilState } from "recoil"
import { activeListData } from "State/Data"
import { heading2, lBold, lNormal, mNormal, normal, sMuted, xBold } from "Stories/Text/Text"
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
const C = {
    pane: css({
        width: "100%",
        height: "200px",
        background: '#151618',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: '24px',
        margin: '10px 20px',
        borderRadius: '8px',

    }),
    avatar: css({
        width: "80px",
        height: "80px",
        background: '#181820',
        borderRadius: '4px',
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


const items = [1, 2, 3, 4, 5]

const insert = (arr: string | any[], index: any, newItem: any) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]

const ComPreview = ({ title, description }: any) => {

    let [activeList, setData]: any = useRecoilState(activeListData)

    const handleShowMore = () => {
        setData(insert(activeList, 0, <div css={C.pane}>asdfasdf</div>))

    }

    return (

        <div css={C.pane} id='COMPREVIEW'>
            <div css={C.avatar}>
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
                    <IconButton aria-label="delete" size="small" sx={{ width: '30px' }}>
                        <SettingsRoundedIcon fontSize="small" color="secondary" /></IconButton>
                </Tooltip>
                <Button variant="outlined" color='success' size='small' sx={{ borderRadius: '8px' }}>Follow</Button>

                {/* <Button variant="contained" color='tri' onClick={handleShowMore}>Show More</Button> */}
            </div>
        </div>

    )
}



export default ComPreview