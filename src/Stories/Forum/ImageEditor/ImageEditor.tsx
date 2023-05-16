/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
//@ts-ignore
import AvatarEditor from 'react-avatar-editor'
import { Button, DialogActions, Slider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { mutedBold, smMuted } from 'Stories/Bits/Text/Text';
import DialogContent from '@mui/material/DialogContent';
import { useCallback, useRef, useState } from 'react';
import { fileUpload } from 'Service/Request';
import { socketRequest } from 'Service/Socket';
import { useDropzone } from 'react-dropzone'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { textLight } from 'Global/Mixins';

const C = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'noto sans',

    }),
    dropzone: css({
        width: '120px',
        height: '120px',
        background: '#181820',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f2f2f2',
        marginBottom: '8px',
        padding: '8px',
        textAlign: 'center',
        '&:hover': {
            border: `2px solid hsla(0,0%,100%,.1)`
        },
    }),
}
const ImageEditor = ({ type, api, width, height, id }: any) => {

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

    const onDrop = useCallback(async (acceptedFiles: any) => {
    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleSave = async () => {


        const canvas = editor.current.getImage()
        const canvasScaled = editor.current.getImageScaledToCanvas()
        console.log(canvas, canvasScaled.toDataURL("image/jpeg"))


        let req = await socketRequest(api, { community_id: id, avatar: canvasScaled.toDataURL() })



    }




    return <div css={C.container}>


        <div
            style={{ width: type === 'banner' ? '240px' : '120px' }}
            css={C.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :

                    <>
                        <CloudUploadRoundedIcon sx={{ fontSize: '30px' }} />
                        <p css={{
                            fontSize: '12px',

                        }}> Drag and Drop or Upload <span css={{ fontWeight: 'bold' }}>{type}</span> image</p>
                    </>

            }
        </div>


        {/* <div css={C.buttons}>

            <Button
                disableElevation
                sx={{
                    display: "flex",
                    height: "42px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "24px",
                }}
                onClick={handleOpen}
                variant="contained" size='small' component="label">
                Upload
                <input
                    onChange={handleImage}
                    hidden accept="image/*" multiple type="file" />
            </Button>


        </div> */}

        <Dialog open={open} onClose={handleClose} maxWidth='lg' >
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