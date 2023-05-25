
import { personData } from "State/Data";
import Avatar from "Stories/Bits/Avatar/Avatar";
import { getRecoil } from "recoil-nexus";

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

    function removeDuplicates(data: any) {
        const seen = new Set();
        const result: any = [];
        data.forEach(
            (item: any) => {
                if (!seen.has(item.public_id)) {
                    seen.add(item.public_id);
                    result.push(item);
                }
            });
        return result;
    }

    return removeDuplicates(result)

}
export const messengerLTT = (list: any) => {

    let person = getRecoil(personData)

    console.log(';ost', list,)

    let tree: any = [];



    list.forEach((messenger: any, iter: any) => {
        console.log(messenger)

        const other = messenger.members.filter((item: any) => item.person.public_id !== person.public_id)

        console.log('other', other[0])
        try {
            tree.push({
                id: messenger.public_id,
                type: 'leaf',
                path: `m${iter}`,
                link: `/m/${messenger.public_id}`,
                active: true,
                visible: true,
                object: {
                    id: messenger.public_id,
                    title: other[0].person.nickname,
                    icon: <Avatar size='small' public_id={other[0].person.public_id} />,
                    // ...messenger
                },
                children: false,
            })
        } catch (e) {
            console.log(e)

        }
    })
    console.log('tree', tree)

    return tree

}


