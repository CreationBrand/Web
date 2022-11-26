import { ComponentStory, ComponentMeta } from '@storybook/react'
// import Paper from 'base/Paper/Paper'
import Tri from './Tri'
export default {
    title: 'layout/Tri',
    component: Tri
} as ComponentMeta<typeof Tri>

// const Template: ComponentStory<typeof Tri> = (args) => <Tri {...args} />

// // export const Default = Template.bind({})

// // Default.args = {
// //     left:true,
// //     right:false,
// //     children: (
// //             <>
// //              <Paper background="red" />
// //             <Paper background="green" />
// //             <Paper background="blue" />
// //             </>
// //     )
// // }
// export const Active = () => {
//     return (
//         <Tri left={true} right={true}>
//             <Paper background="red" />
//             <Paper background="green" />
//             <Paper background="blue" />
//         </Tri>
//     )
// }

// export const Left = () => {
//     return (
//         <Tri left={true} right={false}>
//             <Paper background="red" />
//             <Paper background="green" />
//             <Paper background="blue" />
//         </Tri>
//     )
// }

// export const Right = () => {
//     return (
//         <Tri left={false} right={true}>
//             <Paper background="red" />
//             <Paper background="green" />
//             <Paper background="blue" />
//         </Tri>
//     )
// }

// export const Closed = () => {
//     return (
//         <Tri left={false} right={false}>
//             <Paper background="red" />
//             <Paper background="green" />
//             <Paper background="blue" />
//         </Tri>
//     )
// }
