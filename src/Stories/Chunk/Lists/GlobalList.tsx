/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import usePostList from 'Hooks/Pull/usePostList'
import VirtuList from '../VirtualList/VirtuList'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom'
import useWindow from 'Hooks/useWindow'
import { useRecoilValue } from 'recoil'
import { authFlow } from 'State/Flow'
import useResizeObserver from '@react-hook/resize-observer'
import useSize from 'Hooks/useSize'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import { mainSizeState } from 'State/Data'


const C = {
    container: css({
        height: '100%',
        width: '100%',
        position: 'absolute',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        zIndex: 50,
        gap: '12px',

    })
}




const GlobalList = ({ type }: any) => {

    const mainSize = useRecoilValue(mainSizeState)
    const [expanded, setExpanded]: any = useState(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    const [isLoading, isError, components] = usePostList(type, 'none')

    return (
        <motion.div
            key={type}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div css={{ maxWidth: '800px', width: '100%' }}>
                {isError || isLoading ? <ChunkError variant={isError ? 'error' : 'loading'} /> :
                    <VirtuList list={components} public_id={type} />}
            </div>

            {(mainSize > 0) &&
                <div css={{ height: 'min-content', marginTop: '16px' }}>
                    {mainSize > 1 &&
                        <div css={{ width: '240px', marginBottom: '16px' }}>
                            <Accordion
                                disableGutters
                                sx={{ background: '#272732', color: '#f2f3f5' }}
                                expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    Popular Communities
                                </AccordionSummary>
                                <AccordionDetails>

                                    <div css={{ display: 'flex', flexWrap: 'wrap', color: '#d7dadc', gap: '12px' }}>
                                        <Link style={{ textDecoration: 'none' }} to={'/c/06fc5e2a-8fe7-496f-9ec9-dbb2ae4df819'}>Questions</Link>
                                        <Link style={{ textDecoration: 'none' }} to={'/c/aa3aed31-d79e-4bcf-9503-20746a4a9403'}>Development</Link>
                                        <Link style={{ textDecoration: 'none' }} to={'/c/ed685d41-4d7a-4ed5-a24d-1e7de3b5643d'}>League of legends</Link>
                                        <Link style={{ textDecoration: 'none' }} to={'/c/35a07980-4301-4367-8478-90da0e311d3c'}>Memes </Link>
                                        <Link style={{ textDecoration: 'none' }} to={'/c/ed685d41-4d7a-4ed5-a24d-1e7de3b5643d'}>PoliticalCompassMemes</Link>
                                    </div>


                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    Policies
                                </AccordionSummary>
                                <AccordionDetails>
                                    This is a work in progress.
                                    Please be respectful and open minded in your discussions. We are all here to learn and grow together.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3bh-content"
                                    id="panel3bh-header"
                                >
                                    What Are Filters?
                                </AccordionSummary>
                                <AccordionDetails>
                                    The filters are the main moderation tool on Artram.
                                    Moderators can apply filters to their communities to help them moderate.
                                </AccordionDetails>
                            </Accordion>

                        </div>
                    }
                    <GlobalFilter />
                </div>
            }

        </motion.div>
    )
}


export default GlobalList