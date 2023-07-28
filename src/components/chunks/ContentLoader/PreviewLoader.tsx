/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { memo } from "react";
import 'react-quill/dist/quill.snow.css'

import Link from './Link';
import Carousel from './Carousel';
import Text from './Text';
import Image from './Image';
import Player from './Player';
import { bg_2, text_2 } from '@/global/var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faLink, faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
import { layoutSize } from '@/state/layout';
import { useRecoilValue } from 'recoil';

const C = {
    container: css({
        width: '62.5px',
        height: '62.5px',
        borderRadius: '12px',
        background: bg_2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: text_2,
        marginTop: 'auto',
    }),
}


const PreviewLoader = ({ type, content, public_id, view }: any) => {

    const layout = useRecoilValue(layoutSize)

    return <div
        style={{
            width: layout === 'desktop' ? '62.5px' : '40px',
            minWidth: layout === 'desktop' ? '62.5px' : '40px',
            height: layout === 'desktop' ? '62.5px' : '40px',
            fontSize: layout === 'desktop' ? '22px' : '16px',
        }}
        css={C.container}>
        {type === 'link' && <FontAwesomeIcon icon={faLink} />}
        {type === 'text' && <FontAwesomeIcon icon={faKeyboard} />}
        {type === 'upload' && <FontAwesomeIcon icon={faPhotoFilm} />}
    </div>
}



export default memo(PreviewLoader)







