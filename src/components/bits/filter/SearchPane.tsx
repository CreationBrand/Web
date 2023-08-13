/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Button } from '@mui/material'
import { faAddressCard, faLayerGroup, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bg_3, bg_active } from '@/global/var';


const C = {
    container: css({
        marginTop: '12px',
        width: '100%',
        height: '42px',
        background: bg_3,
        borderRadius: '8px',
        padding: '8px',
        gap: '8px',
        maxWidth: '800px',
        alignItems: 'center',
        display: 'flex',

    }),
}

const SearchPane = ({ value, onChange }: any) => {

    const handleHot = () => onChange('post')
    const handleNew = () => onChange('person')
    const handleTop = () => onChange('community')

    return (

        <div css={C.container}>

            <Button
                onClick={handleHot}
                variant="text"
                size="small"
                color="secondary"
                sx={{

                    gap: '6px',
                    borderRadius: '8px',
                    padding: '4px 12px 4px 12px',
                    background: value === 'post' ? bg_active : bg_3,
                    color: value === 'post' ? '#fff' : '#d7dadc'
                }}
            >
                <FontAwesomeIcon icon={faNewspaper} />
                <div css={{ fontSize: '12px' }}>Posts</div>
            </Button>

            <Button
                onClick={handleTop}
                variant="text"
                size="small"
                color="secondary"
                sx={{
                    gap: '6px',
                    borderRadius: '8px',
                    padding: '4px 12px 4px 12px',
                    background: value === 'community' ? bg_active : bg_3,
                    color: value === 'community' ? '#fff' : '#d7dadc'
                }}
            >
                <FontAwesomeIcon icon={faLayerGroup} />
                <div css={{ fontSize: '12px' }}>Communities</div>
            </Button>

            <Button
                onClick={handleNew}
                variant="text"
                size="small"
                color="secondary"
                sx={{
                    gap: '6px',
                    borderRadius: '8px',
                    padding: '4px 12px 4px 12px',
                    background: value === 'person' ? bg_active : bg_3,
                    color: value === 'person' ? '#fff' : '#d7dadc'
                }}>
                <FontAwesomeIcon icon={faAddressCard} />
                <div css={{ fontSize: '12px' }}>People</div>
            </Button>

        </div>
    )
}

export default SearchPane 
