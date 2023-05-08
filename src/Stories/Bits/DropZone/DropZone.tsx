/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { textLabel, textLight } from 'Global/Mixins';


const C = {
    container: css({
        background: '#343442',
        padding: '8px',
        borderRadius: '8px',
    }),
    dropzone: css({
        width: '100%',
        height: '120px',
        background: '#272732',
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
        background: '#272732',
        borderRadius: '8px',
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f2f2f2',
    }),
    array: css({
        display: 'flex',
        gap: '8px',
    }),
}


const DropZone = ({ value, onChange }: any
) => {

    let [files, setFiles]: any = useState([])

    const onDrop = useCallback(async (acceptedFiles: any) => {

        if (acceptedFiles.length === 1 && acceptedFiles[0].type === 'video/mp4') {
            console.log(acceptedFiles[0])
            onChange({
                type: 'video',
                source: URL.createObjectURL(acceptedFiles[0]),
                file: await get_file_array(acceptedFiles[0]),
            })
            files.push(...acceptedFiles)
        }

        else {
            let temp: any = []
            let buffers: any = []
            acceptedFiles.forEach(async (file: any) => {
                console.log(file)
                if (file.type === 'image/jpeg') {
                    temp.push(URL.createObjectURL(file))
                    buffers.push(await toBase64(file))
                }
            })
            onChange({
                type: 'image',
                source: temp,
                files: buffers,
            })


            files.push(...acceptedFiles)
        }




        // console.log(URL.createObjectURL(acceptedFiles[0]))


        // console.log(acceptedFiles)
        // files.push(...acceptedFiles)
    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (

        <div css={C.container}>
            <div css={textLabel('s')}>Upload</div>

            <div css={C.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :

                        <>
                            <CloudUploadRoundedIcon sx={{ fontSize: '40px' }} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                            <div css={textLight('s')}>Supports a single MP4 or a group of JPEGS</div>
                        </>

                }
            </div>
            {files.length > 0 && <div css={textLabel('s')}>Files</div>}

            <div css={C.array}>
                {files.map((file: any, iter: number) => (
                    <div css={C.files} key={file.path}>
                        {file.name}
                        <ClearRoundedIcon onClick={() => {
                            let temp = [...files]
                            temp.splice(iter, 1)
                            setFiles(temp)
                        }} />
                    </div>
                ))}
            </div>
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