import { getRecoil, setRecoil } from 'recoil-nexus'
import { io, Socket } from 'socket.io-client'
import { communityData } from 'State/Data'
import colorLog from 'Util/colorLog'
import { socketFlow } from 'State/Flow'
import { DefaultEventsMap } from '@socket.io/component-emitter'

let socket: Socket<DefaultEventsMap, DefaultEventsMap>

export const connectSocket = async () => {

    // SOCKET.IO CONNECTION

    var cookies = parseCookies()

    socket = io('ws://localhost:8000', {
        reconnectionDelayMax: 10000,
        auth: {
            token: cookies.accessToken
        },
        query: {
            'my-key': 'my-value'
        }
    })


    // SOCKET UPDATES HANDLERS
    socket.on('communitys', (data) => {
        console.log(data)
        let se = setRecoil(communityData, data)
        console.log('setstate', se)
    })


    socket.io.on("error", (error) => {
        colorLog('[SOCKET] Connection Failed', 'error')
    });


    socket.on("connect", () => {
        colorLog('[SOCKET] Connection Established', 'success')
        setRecoil(socketFlow, socket)
    });




}
const parseCookies = () => {
    var cookies = document.cookie
    var output: any = {}
    cookies.split(/\s*;\s*/).forEach(function (pair: any) {
        pair = pair.split(/\s*=\s*/)
        var name = pair[0].split('.')
        output[name[name.length - 1]] = pair.splice(1).join('=')
    })
    return output
}
