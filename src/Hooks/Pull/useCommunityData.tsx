import { useEffect, useState, } from 'react'
import { socketRequest } from 'Service/Socket'
import TTLCache from '@isaacs/ttlcache';

const cache = new TTLCache({ max: 10000, ttl: 300000 })

const useCommunityData = (public_id: string) => {
    const [data, setData]: any = useState(null)

    useEffect(() => {

        if (!public_id) return 
        (async () => {
            if (cache.has(`community:${public_id}`)) {
                setData(cache.get(`community:${public_id}`))
                return
            } else {
                let temp: any = await socketRequest('community', { community_id: public_id })
                setData(temp)
                cache.set(`community:${public_id}`, temp)
            }
        })()
    }, [public_id])


    return data

}


export default useCommunityData