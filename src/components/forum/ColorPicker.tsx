/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Tooltip } from '@mui/material';
import { Controller } from 'react-hook-form';

// ICONS
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import ColorMenu from '../menu/ColorMenu';
import { layoutSize } from '@/state/layout';


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




const ColorPicker = ({ control }: any) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const layout = useRecoilValue(layoutSize)
    const handleClick = (event: any) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Controller
            name="color"
            control={control}
            render={({ field: { onChange, value } }: any) =>

                <div css={{ display: 'flex', gap: '8px', flexWrap:'wrap' }}>
                    <ColorMenu anchorEl={anchorEl} onClose={handleClose} onChange={onChange} />



                    {/* <Tooltip title="Remove Color" arrow placement='bottom'>

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
                    </Tooltip> */}
                    <Tooltip title="Pick A Color" arrow placement='bottom'>
                        <div
                            onClick={handleClick}
                            css={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                border: '2px solid #857f87',
                                cursor: 'pointer',
                                background: `#${Number(value)?.toString(16)}`,
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
        />


    )

}

export default ColorPicker;