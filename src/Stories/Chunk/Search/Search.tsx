/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Autocomplete, Input, Popover, Popper } from '@mui/material'
import { useCallback, useRef, useState } from 'react'
import { socketRequest } from 'Service/Socket'

import { Menu } from '@mui/material';
import { mBold, mMuted, sBold, sMuted, sNormal } from 'Stories/Bits/Text/Text';
import Avatar from 'Stories/Bits/Avatar/Avatar';

const s = css({
    width: '100%',
    height: '100%',
    position: 'relative',
})


const Search = () => {


    const anchorEl: any = useRef(null);

    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)

    const [persons, setPersons]: any = useState([])
    const [communitys, setCommunitys]: any = useState([])

    let bounce = async (bouncedQuerry: any) => {
        console.log('typeahead', bouncedQuerry)

        if (bouncedQuerry.length < 5) return
        let req: any = await socketRequest('typeAhead', { query: bouncedQuerry })
        setOpen(true)
        console.log('req', req)

        let tempPersons = []
        for (var i in req.persons) {

            tempPersons.push(
                <div key={req.persons[i].public_id}
                    css={{
                        borderRadius: '8px',
                        gap: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: '4px',
                        '&:hover': { background: '#1f1e20' }
                    }}
                >
                    <Avatar
                        size='small'
                        public_id={req.persons[i].public_id} />
                    <div>
                        <div css={mBold}>{req.persons[i].username}</div>
                        <div css={sNormal}>{req.persons[i].nickname} - {req.persons[i].karma} karma</div>
                    </div>
                </div>)
        }

        let tempCommunitys = []
        for (var i in req.communities) {

            tempCommunitys.push(
                <div key={req.communities[i].public_id}
                    css={{
                        borderRadius: '8px',
                        gap: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: '4px',
                        '&:hover': { background: '#1f1e20' }
                    }}
                >
                    <Avatar
                        size='small'
                        public_id={req.communities[i].public_id} />
                    <div>
                        <div css={mBold}>{req.communities[i].title}</div>
                        <div css={sNormal}>{req.communities[i].description} - {req.communities[i].subscribers} members</div>
                    </div>
                </div>)
        }

        setPersons(tempPersons)
        setCommunitys(tempCommunitys)

    }

    const optimizedFn = useCallback(debounce(bounce), []);

    const typeahead = async (e: any) => {
        // console.log('typeahead1', e.target.value)
        // e.stopPropagation()
        await setQuery(e.target.value)
        optimizedFn(e.target.value)
    }



    return <div css={s} id="SEARCH">


        <Input
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            ref={anchorEl}
            value={query}
            onChange={typeahead}
            placeholder="Search"
            fullWidth
            sx={{ background: '#0f0e10', height: '34px', marginTop: '8px', color: '#d7dadc', zIndex: 110 }}
            disableUnderline
        ></Input>

        <Popper
            disablePortal
            sx={{
                position: 'relative',
                borderRadius: '8px',
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                top: '-2px !important',
                padding: '12px 12px 12px 12px',
                width: '100%', height: 'auto', background: '#0f0e10', zIndex: 100,
            }}
            open={open} anchorEl={anchorEl.current}>



            {communitys.length > 0 && <div>
                <div css={[mMuted, { marginBottom: '4px' }]}>Communitys</div>
                {communitys}
            </div>}



            {persons.length > 0 && <div>
                <div css={[mMuted, { marginBottom: '4px' }]}>Users</div>
                {persons}
            </div>}

        </Popper>




    </div >
}

export default Search



const debounce = (func: any) => {
    let timer: any;
    return function (...args: any) {
        //@ts-ignore
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, 500);
    };
};
