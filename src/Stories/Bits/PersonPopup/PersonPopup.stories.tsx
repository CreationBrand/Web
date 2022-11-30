import { ComponentStory, ComponentMeta } from '@storybook/react'
import PersonPopup from './PersonPopup'

export default {
    title: 'Bits/PersonPopup',
    component: PersonPopup,
} as ComponentMeta<typeof PersonPopup>

const Template: ComponentStory<typeof PersonPopup> = (args) => <PersonPopup {...args} />

export const Default = Template.bind({})

Default.args = {
    username: 'badwithawp',
    public_id: '379c52eb-0f73-42ab-acfd-879b1e06d56a',
    nickname: 'Big man 2',
}
