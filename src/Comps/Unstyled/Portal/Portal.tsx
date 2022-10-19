import React, { forwardRef, cloneElement } from 'react'
import { createPortal } from 'react-dom'

const Portal = forwardRef((props: Props, ref: any) => {
    // render location

    console.log(props.target)
    const target = props.target || document.body

    // clones children to pass ref
    const refPass = cloneElement(props.children, {
        ref: (el: any) => (ref = el)
    })

    return (
        <React.Fragment>
            {props.active ? createPortal(refPass, target) : false}
        </React.Fragment>
    )
})

export default Portal

export interface Props {
    active: boolean
    target?: any
    children?: any
}
