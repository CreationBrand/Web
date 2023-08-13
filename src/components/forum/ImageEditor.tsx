/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
//@ts-ignore
import AvatarEditor from 'react-avatar-editor'
import { Button, DialogActions, Modal, Slider } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { socketRequest } from '@/hooks/util/useSocket';
import { bg_2, bg_forum } from '@/global/var';

const C = {
    container: css({
        // backgroundColor: 'rgba(15,14,16,0.90)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    popup: css({
        background: bg_forum,
        height: "auto",
        margin: "0 auto",
        borderRadius: "12px",
        overflow: "hidden",
        // boxShadow: "0px 8px 80px rgba(0,0,0,0.8)",
    }),
    dropzone: css({
        width: '120px',
        height: '120px',
        background: bg_2,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f2f2f2',
        // marginBottom: '8px',
        padding: '8px',
        textAlign: 'center',
    }),
}
const ImageEditor = ({ type, api, width, height, id }: any) => {

    //state
    const editor: any = useRef(null);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(0.5)
    const [error, setError] = useState(false)
    //dialog
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //image
    const handleScale = (e: any, value: any) => setScale(value)
    const handleImage = (e: any) => setImage(e.target.files[0])

    const onDrop = useCallback(async (acceptedFiles: any) => {
        console.log('%c[FILE] ', 'font-weight:bold; color: #fcb358', `Type: ${acceptedFiles[0].type} Bytes:${acceptedFiles[0].size}`);

        console.log(acceptedFiles[0].type)
        if (acceptedFiles[0].size > 10000000 || (acceptedFiles[0].type !== 'image/jpeg' && acceptedFiles[0].type !== 'image/png' && acceptedFiles[0].type !== 'image/jpg' && acceptedFiles[0].type !== 'image/webp')) {
            setImage(null)
            setError(true)
            return
        } else {
            setImage(acceptedFiles[0])
            setOpen(true)
        }
    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleSave = async () => {

        setError(false)
        const canvas = editor.current.getImage()
        const canvasScaled = editor.current.getImageScaledToCanvas()
        let req: any = null

        if (api === 'community-banner' || api === 'community-avatar') {
            req = await socketRequest(api, { community_id: id, file: canvasScaled.toDataURL() })
        }
        else if (api === 'person-avatar' || api === 'person-banner') {
            req = await socketRequest(api, { file: canvasScaled.toDataURL() })
        }

        if (req?.status === 'ok') handleClose()
    }



    return <div>


        <div
            style={{
                width: type === 'banner' ? '100%' : '120px',
                border: error ? '2px solid red' : `2px solid ${bg_2}`
            }}
            css={C.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :

                    <>
                        <CloudUploadRoundedIcon sx={{ fontSize: '30px' }} />
                        <p css={{
                            fontSize: '12px',
                            margin: '0',
                            padding: '0',
                        }}> Upload <span css={{ fontWeight: 'bold' }}>{type}</span> image</p>
                    </>

            }
        </div>


        <Modal open={open} onClose={handleClose} css={C.container} >

            <div css={C.popup}>
                {image &&
                    <AvatarEditor
                        ref={editor}
                        image={image}
                        width={type === 'banner' ? 800 : 160}
                        height={type === 'banner' ? 140 : 160}
                        border={24}
                        color={[0, 0, 0, 0.95]}
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


                <DialogActions>
                    <Button
                        sx={{
                            borderRadius: '8px',
                            fontSize: '12px',
                        }}
                        onClick={handleClose} color='secondary'>Cancel</Button>
                    <Button
                        sx={{
                            borderRadius: '8px',
                            fontSize: '12px',
                        }}
                        onClick={handleSave} variant="contained">Save</Button>
                </DialogActions>
            </div>


        </Modal>
    </div>
}



export default ImageEditor