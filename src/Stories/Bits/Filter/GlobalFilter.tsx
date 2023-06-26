/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { tagData } from 'State/Data'
import { memo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import { filterFlow } from 'State/Flow';
import { Tooltip } from '@mui/material';



const C = {
    container: css({
        width: 'min-content',
        minHeight: '10px',
        overflow: 'hidden',
        height: 'min-content',
    }),
    inner: css({
        margin: '0 auto',
        maxWidth: '800px',
    }),
    wrap: css({
        background: '#272732',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px',
        borderRadius: '8px',
        width: 'min-content',
    }),
    box: css({
        height: '24px',
        width: '24px',
        borderRadius: '8px',
        border: '2px solid',
        cursor: 'pointer',
    }),
}


const GlobalFilter = () => {

    const tags = useRecoilValue(tagData)
    const [filter, setFilter] = useRecoilState(filterFlow)

    const handleTag = (e: any) => {
        if (filter.indexOf(e.currentTarget.dataset.test) > -1) {
            setFilter((prev: any) => prev.filter((_value: any, index: any) => index !== filter.indexOf(e.currentTarget.dataset.test)));
        } else {
            setFilter([...filter, e.currentTarget.dataset.test])
        }
    }

    return (<div css={C.container}>
        <div css={C.inner}>
            <div css={C.wrap}>
                <StyleRoundedIcon sx={{
                    color: '#f2f3f5',
                }} />
                {tags.map((tag: any) => {
                    return <Tooltip title={tag.title} placement='right' key={tag.title}>
                        <div
                            data-test={tag.public_id}
                            onClick={handleTag}
                            style={{
                                backgroundColor: !Boolean(filter.indexOf(tag.public_id) > -1) ? "#" + tag.color?.toString(16) : 'transparent',
                                borderColor: "#" + tag.color?.toString(16),
                            }}
                            css={C.box} key={tag.public_id}
                        >
                        </div></Tooltip>
                })}</div>
        </div>
    </div >)
}





export default GlobalFilter;