//@ts-nocheck
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Post from './Post'

export default {
    title: 'Object/Post',
    component: Post
} as ComponentMeta<typeof Post>

const Template: ComponentStory<typeof Post> = (args) => <Post {...args} />

export const Default = Template.bind({})

Default.args = {
    data: {
        vote: 1,
        public_id: '25a2b450-2651-499b-89d0-9f2b26e418e2',
        title: 'First post ',
        type: 'TEXT',
        content: 'This is my first text post.',
        karma: 2,
        comments: 0,
        created_at: '2022-11-10T02:24:12.909Z',
        updated_at: '2022-11-10T02:24:12.909Z',
        hot: 1.187767697821285e-11,
        author: {
            public_id: '379c52eb-0f73-42ab-acfd-879b1e06d56a',
            nickname: 'undefined',
            username: '379c52eb-0f73-42ab-acfd-879b1e06d56a'
        },
        community: {
            public_id: '6e7e4624-b80b-4e37-9da4-4081eb6aee1f',
            title: 'title'
        }
    }
}
