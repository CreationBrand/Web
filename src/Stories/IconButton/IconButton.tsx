/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Button, Tooltip } from "@mui/material"

const C = {
    container: css({

    }),
}

const IconButton = (props: Props) => {
    return <div css={[C.container]}>

        <Tooltip title="Add" arrow>
            <Button>Arrow</Button>
        </Tooltip>

    </div>

}

interface Props {
    icon: React.ReactNode
}


export default IconButton