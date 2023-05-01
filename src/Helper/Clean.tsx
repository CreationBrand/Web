import { faFire, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { messengerData } from "State/Data";
import Avatar from "Stories/Bits/Avatar/Avatar";
import { useRecoilValue } from "recoil";

interface tree {
    id: string,
    type: string,
    path: string,
    active: boolean,
    visible: boolean,
    children: tree[],
}


export const communityLTT = (list: any) => {

    let tree: any = [


        
    ];

    list.forEach((group: any, iter1: number) => {

        let children: any = []

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

        tree.push({
            id: group.public_id,
            path: iter1,
            type: 'group',
            active: true,
            visible: true,
            object: group,
            children: children,
        })
    })

    return tree

}


export const messengerLTT = (list: any) => {

    let tree: any = [];



    list.forEach((messenger: any, iter: any) => {
        tree.push({
            id: messenger.public_id,
            type: 'leaf',
            path: iter,
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


