/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { textLabel, textLight } from 'Global/Mixins';

// ICONS
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';

const C = {
    container: css({
        borderRadius: '8px',
    }),
    dropzone: css({
        width: '100%',
        height: '120px',
        background: '#181820',
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
        background: '#181820',
        borderRadius: '8px',
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f2f2f2',
        fontSize: '10px',
        whiteSpace: 'nowrap',
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

        // if (acceptedFiles.length !== 1) {
        //     setFiles([])
        //     setError(true)
        //     return
        // }



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
            if (acceptedFiles[i].type !== 'image/jpeg' && acceptedFiles[i].type !== 'image/jpg' && acceptedFiles[i].type !== 'image/png' || acceptedFiles[i].size > 10000000) {
                setFiles([])
                setError(true)
                return
            } else {
                temp.push(URL.createObjectURL(acceptedFiles[i]))
                buffers.push(await toBase64(acceptedFiles[i]))
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


    return (

        <div css={C.container}>
            <div css={[textLabel('s'), {
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
                            setFiles([])
                            onChange([])
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