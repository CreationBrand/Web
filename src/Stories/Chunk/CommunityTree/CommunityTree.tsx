import useCommunityTree from "Hooks/useCommunityTree";
import { useRecoilState } from "recoil"
import { communityData, communityTreeData } from "State/Data"
import VirtualTree from "../VirtualTree/VirtualTree";
import { useState } from "react";
import { Input } from "@mui/material";
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import theme from "Global/Theme";




const CommunityTree = () => {

    const [value, setValue] = useState('')
    const handleSearch = (e: any) => setValue(e.target.value)

    const [tree, setTree] = useRecoilState(communityTreeData)


    const handleMove = (source: any, target: any) => { }



    if (!tree) return <div>Loading</div>


    return <div>

        <Input
            onChange={handleSearch}
            value={value}
            fullWidth
            disableUnderline
            placeholder="Search..."
            startAdornment={<ManageSearchRoundedIcon color="secondary" />}
            sx={{
                marginBottom: '8px',
                height: '32px',
                fontSize: '14px',
                borderRadius: '8px',
                backgroundColor: theme.background.pri,
                fontFamily: 'Ubuntu',
                border: '2px solid',
                borderColor: theme.background.pri,
            }}
        />


        <VirtualTree tree={tree} setTree={setTree} />


    </div>
}




export default CommunityTree



