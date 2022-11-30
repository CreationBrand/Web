import { ComponentStory, ComponentMeta } from '@storybook/react'
import Vote from './Vote'

export default {
    title: 'Bits/Vote',
    component: Vote
} as ComponentMeta<typeof Vote>

const Template: ComponentStory<typeof Vote> = (args) => <Vote {...args} />

export const Default = Template.bind({})

Default.args = {
    karma: 0
}
