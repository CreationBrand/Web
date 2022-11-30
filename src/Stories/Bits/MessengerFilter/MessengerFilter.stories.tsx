import { ComponentStory, ComponentMeta } from '@storybook/react'
import MessengerFilter from './MessengerFilter'

export default {
    title: 'Bits/MessengerFilter',
    component: MessengerFilter,
} as ComponentMeta<typeof MessengerFilter>

const Template: ComponentStory<typeof MessengerFilter> = (args) => <MessengerFilter {...args} />

export const Default = Template.bind({})

Default.args = {}
