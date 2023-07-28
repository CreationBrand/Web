/** @jsxImportSource @emotion/react */

import { postList } from '@/state/sync';
import { css } from '@emotion/react'
import { faArrowLeft, faArrowRight, faArrowUpFromBracket, faCircleUp, faLeftLong, faRightLong, faSquareCaretUp, faTurnUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';


const C = {
    container: css({
        background: '#272732',
        borderRadius: '8px',
        width: '40px',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
        color: '#d7dadc',
        gap: '10px',
        marginTop: '8px',
        position: 'absolute',
        bottom: '56px',
        // height: '64px',
        overflow: 'hidden',
    }),
    icon: css({
        cursor: 'pointer',
        color: '#d7dadc',
        '&:hover': {
            color: '#fff',
        },
    }),
}

const Move = () => {

    const [components, setComponents]: any = useRecoilState(postList)
    const navigate = useNavigate()
    
    const back = () => navigate(`/c/${params.community_id}`)
    const params = useParams()

    const foward = () => {
        let index: any = findPublicId(components, params.post_id)
        try {
            if (index?.i === components.length - 1 && index?.j === components[index.i].length - 1) return
            else if (index?.j === components[index.i].length - 1) navigate(`/c/${params.community_id}/p/${components[index.i + 1][0].props.public_id}`)
            else navigate(`/c/${params.community_id}/p/${components[index.i][index.j + 1].props.public_id}`)
        }
        catch (e) { }
    }

    const reverse = () => {

        let index: any = findPublicId(components, params.post_id)
        try {
            if (index?.i === 0 && index?.j === 0) return
            else if (index?.j === 0) navigate(`/c/${params.community_id}/p/${components[index.i - 1][components[index.i - 1].length - 1].props.public_id}`)
            else navigate(`/c/${params.community_id}/p/${components[index.i][index.j - 1].props.public_id}`)
        } catch (e) { }
    }


    if (!components.length) return null

    return <div css={C.container}>
        <FontAwesomeIcon css={C.icon} icon={faArrowRight} onClick={foward} />
        <FontAwesomeIcon css={C.icon} icon={faArrowLeft} onClick={reverse} />
    </div>
};

export default Move;


function findPublicId(data: any, targetId: any) {
    for (let i = 0; i < data.length; i++) {
        const innerList = data[i];
        for (let j = 0; j < innerList.length; j++) {
            const obj = innerList[j];
            if (obj.props && obj.props.public_id === targetId) {
                return { i, j };
            }
        }
    }
    return null; // Public ID not found
}