// import { createUseStyles, useTheme } from 'react-jss'

// const useStyles: any = createUseStyles(({ props, theme }: any) => ({
//     layout: {
//         display: 'flex',
//         overflow: 'hidden',
//         height: '100vh',
//         background: '#202225',
//         boxSizing: 'border-box',
//         padding: theme.spacing.padding(6)
//     },
//     left: {
//         height: '100%',
//         boxSizing: 'border-box',
//         width: '25%',
//         display:'flex',
//         justifyContent:'flex-end',
//     },
//     right: {
//         paddingLeft: theme.spacing.padding(6),
//         height: '100%',
//         width: '75%',
//         boxSizing: 'border-box',
//         display:'flex',
//         justifyContent:'flex-start',
//     }
// }))

const Duo = (props: Props) => {
    // const theme = useTheme()
    // const c = useStyles({ theme: { props, theme } })

    return (
        <div></div>
        // <div className={c.layout}>
        //     <div className={c.left}> {props.children[0]} </div>
        //     <div className={c.right}> {props.children[1]} </div>
        // </div>
    )
}

export default Duo

export interface Props {
    children: any
}
