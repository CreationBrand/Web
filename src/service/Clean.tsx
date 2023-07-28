
/** @jsxImportSource @emotion/react */
import Avatar from "@/components/bits/Avatar";
import { css } from "@emotion/react"



import BitSet from "bitset";
import { getRecoil } from "recoil-nexus";

interface tree {
    id: string,
    type: string,
    path: string,
    active: boolean,
    visible: boolean,
    children: tree[],
}


export const communityLTT = (list: any, offset: any = 0) => {

    let tree: any = [];

    if(list.length === 0) return tree
    list?.forEach((group: any, iter1: number) => {
        let children: any = []
        if (group.children) {
            group.children.forEach((item: any, iter2: number) => {

                children.push({
                    id: `${iter1 + offset}.${iter2}`,
                    public_id: item.public_id,
                    path: `${iter1 + offset}.${iter2}`,
                    link: `/c/${item.public_id}`,
                    type: 'leaf',
                    // active: false,
                    // visible: true,
                    object: {
                        icon: <Avatar public_id={item.public_id} size='small' />,
                        ...item
                    },
                })
            })
        }

        tree.push({
            id: group.public_id,
            path: `${iter1 + offset}`,
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

    // let person = getRecoil(person)
    // let tree: any = [];

    // list.forEach((messenger: any, iter: any) => {

    //     const other = messenger.members.filter((item: any) => item.person.public_id !== person.public_id)
    //     const you = messenger.members.filter((item: any) => item.person.public_id === person.public_id)

    //     if (other.length === 0) {
    //         try {
    //             tree.push({
    //                 id: messenger.public_id,
    //                 type: 'leaf',
    //                 path: `m${iter}`,
    //                 link: `/m/${messenger.public_id}`,
    //                 active: true,
    //                 visible: true,
    //                 filter: you[0].messenger_member.status !== 'pending' ? 'active' : 'pending',

    //                 object: {
    //                     status: 'close',
    //                     id: messenger.public_id,
    //                     title: 'No Members',
    //                     icon: <div css={{
    //                         display: 'flex',
    //                         justifyContent: 'center',
    //                         alignItems: 'center',
    //                         width: 34, height: 34, border: '2px solid #D7DADC', borderRadius: 8
    //                     }}></div>,
    //                 },
    //                 children: false,
    //             })
    //         } catch (e) {
    //             console.log(e)

    //         }
    //     }

    //     else {
    //         try {
    //             tree.push({
    //                 id: messenger.public_id,
    //                 type: 'leaf',
    //                 path: `m${iter}`,
    //                 link: `/m/${messenger.public_id}`,
    //                 active: true,
    //                 visible: true,
    //                 filter: you[0].messenger_member.status !== 'pending' ? 'active' : 'pending',

    //                 object: {
    //                     status: you[0].messenger_member.status,
    //                     id: messenger.public_id,
    //                     title: other[0].person.nickname,
    //                     icon: <Avatar public_id={other[0].person.public_id} size='small' />,
    //                 },
    //                 children: false,
    //             })
    //         } catch (e) {
    //             console.log(e)

    //         }
    //     }
    // })

    // return tree

}
export const buildHex = (roles: any) => {
    let hex = new BitSet(0)

    for (var i = 0; i < roles.length; i++) {
        const temp = new BitSet(`0x${roles[i].permissions}`)
        hex = hex.or(temp)
    }
    return hex
}


