/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded'
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded'
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded'
import { Button } from '@mui/material'
import { sMuted } from 'Stories/Text/Text'

const C = {
    container: css({
        width: '100%',
        height: '48px',
        background: '#343442',
        borderRadius: '8px',
        margin: '0px 20px 0px 20px',
        padding: '0px 20px 0px 20px',
        gap: '8px',
        // justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex'
    })
}

const FilterPane = ({ value, onChange }: any) => {
    const handleHot = () => onChange('HOT')
    const handleNew = () => onChange('NEW')
    const handleTop = () => onChange('TOP')

    return (
        <div css={C.container}>
            <Button
                onClick={handleHot}
                variant="text"
                size="small"
                color="secondary"
                sx={{
                    gap: '6px',
                    borderRadius: '12px',
                    padding: '4px 12px 4px 12px',
                    background: value === 'HOT' ? '#272732' : ''
                }}
            >
                <WhatshotRoundedIcon />
                <div css={sMuted}>HOT</div>
            </Button>

            <Button
                onClick={handleTop}
                variant="text"
                size="small"
                color="secondary"
                sx={{
                    gap: '6px',
                    borderRadius: '12px',
                    padding: '4px 12px 4px 12px',
                    background: value === 'TOP' ? '#272732' : ''
                }}
            >
                <AutoGraphRoundedIcon />
                <div css={sMuted}>TOP</div>
            </Button>

            <Button
                onClick={handleNew}
                variant="text"
                size="small"
                color="secondary"
                sx={{
                    gap: '6px',
                    borderRadius: '12px',
                    padding: '4px 12px 4px 12px',
                    background: value === 'NEW' ? '#272732' : ''
                }}
            >
                <NewReleasesRoundedIcon />
                <div css={sMuted}>NEW</div>
            </Button>
        </div>
    )
}

export default FilterPane
