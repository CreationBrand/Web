/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { memo, useState } from "react"
import { Link } from "react-router-dom"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { bg_3 } from '@/global/var';

const C = {
    link: css({
        color: '#d7dadc ',
        fontSize: '12px',
        fontWeight: 600,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            textDecorationThickness: '2px',
        }

    }),
}



const Info = () => {

    const [expanded, setExpanded]: any = useState(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };



    return (<div css={{ width: '240px', marginBottom: '12px' }}>
        <Accordion
            disableGutters
            sx={{ background: bg_3, color: '#f2f3f5' }}
            expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                Popular Communities
            </AccordionSummary>
            <AccordionDetails>

                <div css={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <Link css={C.link} to={'/c/06fc5e2a-8fe7-496f-9ec9-dbb2ae4df819'}>Questions</Link>
                    <Link css={C.link} to={'/c/aa3aed31-d79e-4bcf-9503-20746a4a9403'}>Development</Link>
                    <Link css={C.link} to={'/c/ed685d41-4d7a-4ed5-a24d-1e7de3b5643d'}>League of legends</Link>
                    <Link css={C.link} to={'/c/35a07980-4301-4367-8478-90da0e311d3c'}>Memes </Link>
                    <Link css={C.link} to={'/c/ed685d41-4d7a-4ed5-a24d-1e7de3b5643d'}>PoliticalCompassMemes</Link>
                </div>


            </AccordionDetails>
        </Accordion>
        <Accordion
            sx={{ background: bg_3, color: '#f2f3f5' }}
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}>
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
        <Accordion
            sx={{ background: bg_3, color: '#f2f3f5' }}
            expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
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
    )
}


export default memo(Info)