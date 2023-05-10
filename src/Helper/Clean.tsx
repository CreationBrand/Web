
import Avatar from "Stories/Bits/Avatar/Avatar";

interface tree {
    id: string,
    type: string,
    path: string,
    active: boolean,
    visible: boolean,
    children: tree[],
}


export const communityLTT = (list: any) => {

    let tree: any = [];

    list.forEach((group: any, iter1: number) => {
        let children: any = []
        if (group.children) {
            group.children.forEach((item: any, iter2: number) => {

                children.push({
                    id: item.public_id,
                    path: `${iter1}.${iter2}`,
                    link: `/c/${item.public_id}`,
                    type: 'leaf',
                    active: true,
                    visible: true,
                    object: {
                        icon: true,
                        ...item
                    },
                })
            })
        }

        tree.push({
            id: group.public_id,
            path: `${iter1}`,
            type: 'group',
            active: true,
            link: children.length === 0 ? false : '/g/' + group.public_id,
            visible: true,
            children: children.length === 0 ? false : children,
            object: group,
        })
    })

    return tree

}
export const communityLTL = (list: any) => {

    let result: any = [];

    list.forEach((group: any, iter1: number) => {
        if (group.children) {
            group.children.forEach((item: any, iter2: number) => {
                result.push(item)
            })
        }
    })

    return result

}
export const messengerLTT = (list: any) => {

    let tree: any = [];



    list.forEach((messenger: any, iter: any) => {
        tree.push({
            id: messenger.public_id,
            type: 'leaf',
            path: `m${iter}`,
            link: `/m/${messenger.public_id}`,
            active: true,
            visible: true,
            object: {
                id: messenger.public_id,
                title: messenger.person.nickname,
                icon: <Avatar size='small' public_id={messenger.public_id} />,
                ...messenger
            },
            children: false,
        })
    })

    return tree

}


