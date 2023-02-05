/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
//@ts-ignore
import AvatarEditor from 'react-avatar-editor'
import { Button, DialogActions, Slider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { mutedBold, smMuted } from 'Stories/Bits/Text/Text';
import DialogContent from '@mui/material/DialogContent';
import { useRef, useState } from 'react';
import { fileUpload } from 'Service/Request';


const C = {
    container: css({
        display: 'flex',
        flexDirection: 'column',

    }),
    buttons: css({
        marginTop: '8px',
        display: 'flex',
        gap: '8px',
    }),


}
const ImageEditor = ({ type, api, width, height,id }: any) => {

    //state
    const editor: any = useRef(null);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(0.5)

    //dialog
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //image
    const handleScale = (e: any, value: any) => setScale(value)
    const handleImage = (e: any) => setImage(e.target.files[0])
    const handleSave = async () => {

        const canvas = editor.current.getImage()
        const canvasScaled = editor.current.getImageScaledToCanvas()
        let status = await fileUpload(`${api}/upload`, id, type, canvasScaled.toDataURL())

        console.log(status)

    }




    return <div css={C.container}>

        <div css={mutedBold}>{type}</div>

        <div css={C.buttons}>
            {/* <Button variant="contained" size='small' >Change {type}</Button> */}
            <Button onClick={handleOpen}
                variant="contained" size='small' component="label">
                Change {type}
                <input
                    onChange={handleImage}
                    hidden accept="image/*" multiple type="file" />
            </Button>


            <Button variant="text" size='small' color='secondary'>Remove {type}</Button>
        </div>

        <Dialog open={open} onClose={handleClose}  maxWidth='lg' >
            <DialogContent>

                {image &&
                    <AvatarEditor
                        ref={editor}
                        image={image}
                        width={width}
                        height={height}
                        border={30}
                        color={[0, 0, 0, 0.3]}
                        scale={scale}
                        rotate={0}
                    />

                }

                <Slider
                    min={0}
                    max={2}
                    onChange={handleScale}
                    value={scale}
                    step={0.1}
                    color="secondary"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color='secondary'>Cancel</Button>
                <Button onClick={handleSave} variant="contained">Save</Button>
            </DialogActions>

        </Dialog>




    </div>
}



export default ImageEditor