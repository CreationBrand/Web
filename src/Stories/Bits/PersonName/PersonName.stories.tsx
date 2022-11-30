import { ComponentStory, ComponentMeta } from '@storybook/react'
import PersonName from './PersonName'

export default {
    title: 'Bits/PersonName',
    component: PersonName,
} as ComponentMeta<typeof PersonName>

const Template: ComponentStory<typeof PersonName> = (args) => <PersonName {...args} />

export const Default = Template.bind({})

Default.args = {}
