/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Button from 'Comps/Inputs/Button/Button'
import Input from 'Comps/Inputs/Input/Input'
import Tri from 'Comps/Views/Layout/Tri'
import Nav from 'Comps/Views/Nav/Nav'
import Paper from 'Comps/Base/Paper'
import { useState } from 'react'
import InteractiveList from 'Comps/Base/InteractiveList/InteractiveList'
import CommunityTree from 'Stories/CommunityTree/CommunityTree'
import Status from 'Stories/Status/Status'

const Home = () => {
    const [l, sl] = useState(false)
    const [r, sr] = useState(false)

    let c = {
        input: css({
            maxWidth: '400px',
            height: '36px !important'
        })
    }

    return (
        <Tri left={l} right={r}>
            <Paper background="sec" width="100%" height="100%" radius="m" >
                <Status/>
            </Paper>
            <Paper background="tri" width="100%" height="100%" radius="m">
                <Nav>
                    <Button varient="text" palette="pri" label="P" />
                    <Input so={c.input}></Input>
                </Nav>
                <button
                    onClick={() => {
                        sl(!l)
                    }}
                >
                    L BUTTON
                </button>
                <button
                    onClick={() => {
                        sr(!r)
                    }}
                >
                    R BUTTON
                </button>
            </Paper>
            <Paper background="sec" width="100%" height="100%" radius="m">
                <CommunityTree></CommunityTree>
            </Paper>
        </Tri>
    )
}

export default Home
