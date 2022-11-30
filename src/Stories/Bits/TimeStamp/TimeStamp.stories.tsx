import { ComponentStory, ComponentMeta } from '@storybook/react'
import TimeStamp from './TimeStamp'

export default {
    title: 'Bits/TimeStamp',
    component: TimeStamp
} as ComponentMeta<typeof TimeStamp>

const Template: ComponentStory<typeof TimeStamp> = (args) => (
    <TimeStamp {...args} />
)

export const Default = Template.bind({})

Default.args = {
    time: '2021-07-01T00:00:00.000Z'
}
