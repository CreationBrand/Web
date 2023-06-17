/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import { Button, Input, Switch, Tooltip } from '@mui/material';
import { textLabel } from 'Global/Mixins';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { LoadingButton } from '@mui/lab';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import BitSet from 'bitset';
import { socketRequest } from 'Service/Socket';
import ColorPicker from './ColorPicker';

const C = {
    container: css({
        display: 'flex',
        marginBottom: '40px',
        gap: '16px',
        flexWrap: 'wrap',
    }),
    list: css({
        width: '200px',
        background: '#181820',
        borderRadius: '8px',
        height: 'min-content',
    }),

    ButtonRow: css({
        display: 'flex',

        'button': {
            all: 'unset',
            width: '20px',
            height: '20px',
            marginRight: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
        }
    }),
    perm: css(textLabel('s'), {

    }),
    role: css({
        padding: '8px 16px',
        height: '42px',
        display: 'flex',
        fontWeight: 'bold',
        alignItems: 'center',
        gap: '8px',
        color: '#fff',
        fontSize: '14px',
        '&:hover': {
            background: '#272732',
        }
    }),
    blob: css({
        height: '12px',
        width: '12px',
        borderRadius: '50%',
    }),
}


const RoleEditor = ({ roles, public_id, }: any) => {

    const [components, setComponents]: any = useState([])
    const { register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm({ mode: 'onChange' });
    const [loading, setLoading] = useState(false);
    const [show, setShow]: any = useState(false);

    const handleUpdate = (e: any) => {


        let role = roles[e.target.dataset.value]
        if (role.base) return
        // console.log(role)
        setShow('update')
        setValue('title', role.title)
        setValue('color', role.color)
        setValue('role_id', role.public_id)
        setValue('bitset', new BitSet(parseInt(role.permissions, 16).toString(2)))

    }


    useEffect(() => {
        let temp = []
        for (var i = 0; i < roles.length; i++) {
            temp.push(<div
                style={{ color: roles[i].base ? '#ffbf00' : '' }}
                onClick={handleUpdate}
                data-value={i}
                key={roles[i].public_id} css={C.role} >
                {roles[i].color && <div css={C.blob} style={{ backgroundColor: "#" + roles[i].color?.toString(16) }}></div>}
                {roles[i].title}</div >)
        }
        setComponents(temp)
    }, [roles])


    const onDelete = async (e: any) => {
        setLoading(true)
        let req = await socketRequest('roles-remove', { community_id: public_id, role_id: e.role_id })
        setLoading(false)
        setShow(false)
    }

    const onSubmit = async (data: any) => {
        setLoading(true)
        data.permissions = data.bitset.toString(16)
        delete data.bitset
        data.community_id = public_id
        let req = socketRequest('roles-add', data)
        setLoading(false)
        setShow(false)
    }


    return (<div css={C.container}>


        <div css={C.list}>
            {components}

            <div
                onClick={() => {
                    setShow('new')
                    setValue('title', '')
                    setValue('color', false)
                    setValue('bitset', new BitSet('0000'))
                }}
                key={'create-role'} css={C.role}> <AddCircleOutlineRoundedIcon /> Create New Role</div>
        </div>


        {show === 'new' && <div css={{
            background: '#181820',
            borderRadius: '8px',
            padding: '16px',

        }}>
            <div css={{
                margin: "6px 0px",
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "22px",
                wordBreak: "normal",
                textDecoration: "none",
                color: '#fff',
                marginBottom: '22px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}><>New Role</>

                <div>
                    <Button
                        disableElevation
                        color="secondary"
                        variant='text' onClick={() => setShow(false)}>Cancel</Button>
                    <LoadingButton
                        onMouseDown={handleSubmit(onSubmit)}
                        sx={{ borderRadius: '8px' }}
                        disableElevation
                        variant='contained'>
                        Save
                    </LoadingButton>
                </div>

            </div>


            <h3 css={textLabel('s')}>Title</h3>

            <Controller
                name="title"
                control={control}
                defaultValue={''}
                rules={{ required: true, maxLength: 30 }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        error={errors.title ? true : false}
                        autoComplete="off"
                        onChange={onChange}
                        value={value}
                        disableUnderline
                        fullWidth
                        endAdornment={<div css={{
                            color: '#b9b6ba',
                            marginRight: '8px',
                            fontSize: '12px'
                        }}>{value?.length}/30</div>}
                        sx={{
                            border: '2px solid #857f87',
                            height: "42px",

                        }}
                    />
                )}
            />



            <div css={[textLabel('s'), { marginTop: '36px' }]}>Group Color</div>


            <ColorPicker control={control} />

            {/* <Controller
                name="color"
                control={control}
                render={({ field: { onChange, value } }: any) => <div css={{ display: 'flex', gap: '8px' }}>


                    <Tooltip title="Remove Color" arrow placement='bottom'>

                        <div
                            onClick={() => onChange(false)}
                            css={{
                                cursor: 'pointer',
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                border: '2px solid #857f87',

                                background: `#${Number(value)?.toString(16)}`,
                            }}></div>
                    </Tooltip>
                    <Tooltip title="Pick A Color" arrow placement='bottom'>
                        <div css={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '8px',
                            border: '2px solid #857f87',
                            cursor: 'pointer',
                        }}><ColorLensIcon sx={{ color: '#b9b6ba', marginLeft: '22px' }} />
                        </div>
                    </Tooltip>


                    <div onClick={(e: any) => {

                        if (!e.target.dataset.value) return
                        onChange(e.target.dataset.value)
                    }} css={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div css={C.ButtonRow}>
                            <button
                                type="button"
                                aria-label="#1abc9c"
                                data-value="1752220"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(26, 188, 156)" }}
                            />
                            <button
                                type="button"
                                aria-label="#2ecc71"
                                data-value="3066993"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(46, 204, 113)" }}
                            />
                            <button
                                type="button"
                                aria-label="#3498db"
                                data-value="3447003"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(52, 152, 219)" }}
                            />
                            <button
                                type="button"
                                aria-label="#9b59b6"
                                data-value="10181046"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(155, 89, 182)" }}
                            />
                            <button
                                type="button"
                                aria-label="#e91e63"
                                data-value="15277667"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(233, 30, 99)" }}
                            />
                            <button
                                type="button"
                                aria-label="#f1c40f"
                                data-value="15844367"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(241, 196, 15)" }}
                            />
                            <button
                                type="button"
                                aria-label="#e67e22"
                                data-value="15105570"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(230, 126, 34)" }}
                            />
                            <button
                                type="button"
                                aria-label="#e74c3c"
                                data-value="15158332"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(231, 76, 60)" }}
                            />
                            <button
                                type="button"
                                aria-label="#95a5a6"
                                data-value="9807270"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(149, 165, 166)" }}
                            />
                            <button
                                type="button"
                                aria-label="#607d8b"
                                data-value="6323595"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(96, 125, 139)" }}
                            />
                        </div>
                        <div css={C.ButtonRow}>
                            <button
                                type="button"
                                aria-label="#11806a"
                                data-value="1146986"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(17, 128, 106)" }}
                            />
                            <button
                                type="button"
                                aria-label="#1f8b4c"
                                data-value="2067276"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(31, 139, 76)" }}
                            />
                            <button
                                type="button"
                                aria-label="#206694"
                                data-value="2123412"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(32, 102, 148)" }}
                            />
                            <button
                                type="button"
                                aria-label="#71368a"
                                data-value="7419530"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(113, 54, 138)" }}
                            />
                            <button
                                type="button"
                                aria-label="#ad1457"
                                data-value="11342935"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(173, 20, 87)" }}
                            />
                            <button
                                type="button"
                                aria-label="#c27c0e"
                                data-value="12745742"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(194, 124, 14)" }}
                            />
                            <button
                                type="button"
                                aria-label="#a84300"
                                data-value="11027200"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(168, 67, 0)" }}
                            />
                            <button
                                type="button"
                                aria-label="#992d22"
                                data-value="10038562"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(153, 45, 34)" }}
                            />
                            <button
                                type="button"
                                aria-label="#979c9f"
                                data-value="9936031"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(151, 156, 159)" }}
                            />
                            <button
                                type="button"
                                aria-label="#546e7a"
                                data-value="5533306"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(84, 110, 122)" }}
                            />
                        </div>
                    </div>



                </div>
                    // <HexColorPicker
                    //     style={{ width: '100px', height: '100px' }}
                    //     onChange={onChange}
                    //     color={value}
                    // />
                }
            /> */}



            <div css={[textLabel('s'), { marginTop: '36px' }]}>Permissions</div>


            <Controller
                name="bitset"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }: any) => <>
                    <div css={C.perm}> <Switch onChange={(e: any, val: any) => onChange(value.set(0, val ? 1 : 0))} /> Manage Tags</div>
                    <div css={C.perm}> <Switch onChange={(e: any, val: any) => onChange(value.set(1, val ? 1 : 0))} /> Manage Roles</div>
                    <div css={C.perm}> <Switch onChange={(e: any, val: any) => onChange(value.set(2, val ? 1 : 0))} /> Manage Community</div>
                    <div css={C.perm}> <Switch onChange={(e: any, val: any) => onChange(value.set(3, val ? 1 : 0))} /> Admin </div>
                </>} />
        </div>}




        {show === 'update' && <div css={{
            background: '#181820',
            borderRadius: '8px',
            padding: '16px',

        }}>
            <div css={{
                margin: "6px 0px",
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "22px",
                wordBreak: "normal",
                textDecoration: "none",
                color: '#fff',
                marginBottom: '22px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}><>Update Role</>

                <div>
                    <Button
                        disableElevation
                        color="secondary"
                        variant='text' onClick={() => setShow(false)}>Cancel</Button>
                    <LoadingButton
                        onMouseDown={handleSubmit(onSubmit)}
                        sx={{ borderRadius: '8px' }}
                        disableElevation
                        variant='contained'>
                        Save
                    </LoadingButton>
                </div>

            </div>


            <h3 css={textLabel('s')}>Title</h3>

            <Controller
                name="title"
                control={control}
                defaultValue={''}
                rules={{ required: true, maxLength: 30 }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        error={errors.title ? true : false}
                        autoComplete="off"
                        onChange={onChange}
                        value={value}
                        disableUnderline
                        fullWidth
                        endAdornment={<div css={{
                            color: '#b9b6ba',
                            marginRight: '8px',
                            fontSize: '12px'
                        }}>{value?.length}/30</div>}
                        sx={{
                            border: '2px solid #857f87',
                            height: "42px",

                        }}
                    />
                )}
            />



            <div css={[textLabel('s'), { marginTop: '36px' }]}>Group Color</div>

            <Controller
                name="color"
                control={control}
                render={({ field: { onChange, value } }: any) => <div css={{ display: 'flex', gap: '8px' }}>


                    <Tooltip title="Remove Color" arrow placement='bottom'>

                        <div
                            onClick={() => onChange(false)}
                            css={{
                                cursor: 'pointer',
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                border: '2px solid #857f87',

                                background: `#${Number(value)?.toString(16)}`,
                            }}></div>
                    </Tooltip>
                    <Tooltip title="Pick A Color" arrow placement='bottom'>
                        <div css={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '8px',
                            border: '2px solid #857f87',
                            cursor: 'pointer',
                        }}><ColorLensIcon sx={{ color: '#b9b6ba', marginLeft: '22px' }} />
                        </div>
                    </Tooltip>


                    <div onClick={(e: any) => {

                        if (!e.target.dataset.value) return
                        onChange(e.target.dataset.value)
                    }} css={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div css={C.ButtonRow}>
                            <button
                                type="button"
                                aria-label="#1abc9c"
                                data-value="1752220"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(26, 188, 156)" }}
                            />
                            <button
                                type="button"
                                aria-label="#2ecc71"
                                data-value="3066993"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(46, 204, 113)" }}
                            />
                            <button
                                type="button"
                                aria-label="#3498db"
                                data-value="3447003"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(52, 152, 219)" }}
                            />
                            <button
                                type="button"
                                aria-label="#9b59b6"
                                data-value="10181046"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(155, 89, 182)" }}
                            />
                            <button
                                type="button"
                                aria-label="#e91e63"
                                data-value="15277667"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(233, 30, 99)" }}
                            />
                            <button
                                type="button"
                                aria-label="#f1c40f"
                                data-value="15844367"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(241, 196, 15)" }}
                            />
                            <button
                                type="button"
                                aria-label="#e67e22"
                                data-value="15105570"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(230, 126, 34)" }}
                            />
                            <button
                                type="button"
                                aria-label="#e74c3c"
                                data-value="15158332"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(231, 76, 60)" }}
                            />
                            <button
                                type="button"
                                aria-label="#95a5a6"
                                data-value="9807270"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(149, 165, 166)" }}
                            />
                            <button
                                type="button"
                                aria-label="#607d8b"
                                data-value="6323595"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(96, 125, 139)" }}
                            />
                        </div>
                        <div css={C.ButtonRow}>
                            <button
                                type="button"
                                aria-label="#11806a"
                                data-value="1146986"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(17, 128, 106)" }}
                            />
                            <button
                                type="button"
                                aria-label="#1f8b4c"
                                data-value="2067276"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(31, 139, 76)" }}
                            />
                            <button
                                type="button"
                                aria-label="#206694"
                                data-value="2123412"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(32, 102, 148)" }}
                            />
                            <button
                                type="button"
                                aria-label="#71368a"
                                data-value="7419530"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(113, 54, 138)" }}
                            />
                            <button
                                type="button"
                                aria-label="#ad1457"
                                data-value="11342935"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(173, 20, 87)" }}
                            />
                            <button
                                type="button"
                                aria-label="#c27c0e"
                                data-value="12745742"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(194, 124, 14)" }}
                            />
                            <button
                                type="button"
                                aria-label="#a84300"
                                data-value="11027200"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(168, 67, 0)" }}
                            />
                            <button
                                type="button"
                                aria-label="#992d22"
                                data-value="10038562"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(153, 45, 34)" }}
                            />
                            <button
                                type="button"
                                aria-label="#979c9f"
                                data-value="9936031"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(151, 156, 159)" }}
                            />
                            <button
                                type="button"
                                aria-label="#546e7a"
                                data-value="5533306"
                                tabIndex={-1}
                                style={{ backgroundColor: "rgb(84, 110, 122)" }}
                            />
                        </div>
                    </div>



                </div>

                }
            />

            <div css={[textLabel('s'), { marginTop: '36px' }]}>Permissions</div>

            <Controller
                name="bitset"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }: any) => <>
                    <div css={C.perm}> <Switch checked={Boolean(value.get(0))} onChange={(e: any, val: any) => onChange(value.set(0, val ? 1 : 0))} /> Manage Tags</div>
                    <div css={C.perm}> <Switch checked={Boolean(value.get(1))} onChange={(e: any, val: any) => onChange(value.set(1, val ? 1 : 0))} /> Manage Roles</div>
                    <div css={C.perm}> <Switch checked={Boolean(value.get(2))} onChange={(e: any, val: any) => onChange(value.set(2, val ? 1 : 0))} /> Manage Community</div>
                    <div css={C.perm}> <Switch checked={Boolean(value.get(3))} onChange={(e: any, val: any) => onChange(value.set(3, val ? 1 : 0))} /> Admin </div>
                </>} />

            <LoadingButton
                loading={loading}
                color="error"
                onMouseDown={handleSubmit(onDelete)}
                sx={{ borderRadius: '8px' }}
                disableElevation
                variant='contained'>
                Delete
            </LoadingButton>
        </div>}

    </div >)
};




export default RoleEditor;