/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

// ICONS
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { Reorder } from "framer-motion"
import { bg_1, bg_2 } from '@/global/var';
import { forumLabel } from '@/global/mixins';

const C = {
    container: css({
        borderRadius: '8px',
    }),
    dropzone: css({
        width: '100%',
        height: '120px',
        background: bg_2,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f2f2f2',
        marginBottom: '8px',
    }),
    files: css({
        padding: '8px',
        background: bg_1,
        borderRadius: '8px',
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f2f2f2',
        fontSize: '12px',
        whiteSpace: 'nowrap',
        width: 'min-content',
    }),
    group: css({

    }),
    array: css({
        display: 'flex',
        gap: '8px',
    }),
}


const DropZone = ({ value, onChange }: any
) => {

    let [files, setFiles]: any = useState([])
    let [error, setError] = useState(false)

    const onDrop = useCallback(async (acceptedFiles: any) => {

        if (acceptedFiles.length > 30) {
            setFiles([])
            setError(true)
            return
        }

        if (acceptedFiles.length === 1 && acceptedFiles[0].type === 'video/mp4') {
            if (acceptedFiles[0].size > 10000000) {
                setFiles([])
                setError(true)
                return
            }
            onChange({
                type: 'video',
                source: URL.createObjectURL(acceptedFiles[0]),
                file: await get_file_array(acceptedFiles[0]),
            })
            files.push(...acceptedFiles)
            setError(false)
            return
        }

        let temp: any = []
        let buffers: any = []

        for (let i = 0; i < acceptedFiles.length; i++) {
            console.log(acceptedFiles[i])
            if (["image/gif", 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(acceptedFiles[i].type) && acceptedFiles[i].size < 10000000) {
                temp.unshift(URL.createObjectURL(acceptedFiles[i]))
                buffers.unshift(await toBase64(acceptedFiles[i]))
            }
            else {
                setFiles([])
                setError(true)
                return
            }
        }
        setFiles(acceptedFiles)
        onChange({
            type: 'image',
            source: temp,
            files: buffers,
        })
        setError(false)

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const reorder = async (e: any) => {

        let temp: any = []
        let buffers: any = []
        for (let i = 0; i < e.length; i++) {
            if ((e[i].type !== 'image/jpeg' && e[i].type !== 'image/jpg' && e[i].type !== 'image/png') || e[i].size > 10000000) {
                setFiles([])
                setError(true)
                return
            } else {
                temp.unshift(URL.createObjectURL(e[i]))
                buffers.unshift(await toBase64(e[i]))
            }
        }
        setFiles(e);

        onChange({
            type: 'image',
            source: temp,
            files: buffers,
        })


    }

    return (

        <div css={C.container}>
            <div css={[forumLabel, {
                display: 'flex',
                justifyContent: 'space-between',
            }]}>Upload {error && <div css={{ color: '#c84b4b' }}>Invalid file</div>}</div>

            <div
                style={{ border: error ? '2px solid #c84b4b' : 'none' }}
                css={C.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <>
                            <CloudUploadRoundedIcon sx={{ fontSize: '40px' }} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </>

                }
            </div>
            {files.length > 0 && <div css={forumLabel}>Files</div>}

            <Reorder.Group values={files} onReorder={reorder} css={C.group}>
                {files.map((file: any, iter: number) => (
                    <Reorder.Item

                        key={file.path} value={file} css={C.files} >
                        <img src={URL.createObjectURL(file)} alt="" width="40px" height="40px" />
                        {file.name}
                        &nbsp;&nbsp;&nbsp;
                        {'| ' + (iter + 1)}
                    </Reorder.Item>
                ))}
            </Reorder.Group>

        </div>
    )
}


export default DropZone


const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});




const get_file_array = (file: any) => {
    return new Promise((acc, err) => {
        const reader = new FileReader();
        reader.onload = (event: any) => { acc(event.target.result) };
        reader.onerror = (err: any) => { err(err) };
        reader.readAsArrayBuffer(file);
    });
}