/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import useWindow from 'Hooks/useWindow'
import { createContext } from 'react'
import theme from 'Global/theme'

const { Consumer, Provider }: any = createContext(false)

const bp = { s: 600, m: 900, l: 1200, x: 1500 }

const Grid = ({ root, ...props }: Props) => {
    if (root) {
        return <P children={props.children} props={props} />
    } else {
        return <C children={props.children} props={props} />
    }
}

const P = ({ children, props }: any) => {
    //gets window size and bp set
    const { width }: any = useWindow()

    //gets current bp
    let currentBp: string
    if (width < bp.s) currentBp = 's'
    else if (width < bp.m) currentBp = 'm'
    else if (width < bp.l) currentBp = 'l'
    else currentBp = 'x'

    const s = css({
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: props.align,
        justifyContent: props.justify,
        width: props.width,
        height: props.height
        // gap: `${props.gap}px`
    })

    return (
        <div id={'grid-root'} css={s}>
            <Provider value={currentBp}>{children}</Provider>
        </div>
    )
}

const C = ({ children, props }: any) => {
    return (
        <Consumer>
            {(cbp: any) => {
                //get width of element
                if (cbp === false) return null
                let pos = props[cbp]

                if (!pos && cbp === 'x') {
                    pos = props['l']
                    cbp = 'l'
                }
                if (!pos && cbp === 'l') {
                    pos = props['m']
                    cbp = 'm'
                }
                if (!pos && cbp === 'm') {
                    pos = props['s']
                    cbp = 's'
                }
                let width = 'none'
                let grow = 'none'

                if (pos === false || pos === undefined) return null
                if (pos === true) {
                    width = 'initial'
                    grow = '1'
                } else {
                    width = `calc(${(pos / 12) * 100}% - ${
                        pos === 12
                            ? '0px'
                            : props.ungap
                            ? theme.spacing(props.ungap / 2)
                            : '0px'
                    }) !important`
                }

                const s = css({
                    display: 'flex',
                    boxSizing: 'border-box',
                    flexDirection: props.column ? 'column' : 'row',
                    flexWrap: 'wrap',
                    width: width,
                    flexGrow: grow,
                    alignItems: props.align,
                    justifyContent: props.justify,
                    height: props.height,
                    gap: props.gap ? theme.spacing(props.gap) : '0px'
                })

                return (
                    <div id="grid-item" css={s}>
                        {children}
                    </div>
                )
            }}
        </Consumer>
    )
}

export default Grid

export interface Props {
    root?: boolean
    children?: any
    align?: string
    justify?: string
    column?: boolean
    gap?: number
    ungap?: number
    width?: any
    height?: any
    //points
    s?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    m?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    l?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    x?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}
