import { ComponentStory, ComponentMeta } from '@storybook/react'
import Avatar from './Avatar'

export default {
    title: 'Bits/Avatar',
    component: Avatar
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Default = Template.bind({})

Default.args = {    
    public_id: '25a2b450-2651-499b-89d0-9f2b26e418e2',
    size: 'medium',
}
