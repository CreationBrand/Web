
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { textBold } from "Global/Mixins";





const LogoWithName = () => {

    const C = {
        container: css({
            height: '56px',
            width: '100%',
            maxWidth: '250px',
            overflow: 'hidden',
            display: 'flex',
            background: '#272732',
            borderRadius: '8px',
            paddingLeft: '8px',
            paddingRight: '8px',
            alignItems: 'center',
            gap: '8px',
        }),
        img: css({
            width: '40px',
            height: '40px',
        }),
        column: css({
            display: 'flex',
            flexDirection: 'column',
        })

    }




    return (
        <div css={C.container}>

            <img
                css={C.img}
                src="./Logo.png" />

            <div css={C.column}>
                <div css={{
                    color: '#fff',
                    fontFamily: 'Sigmar',
                    fontSize: '20px',
                    letterSpacing: '1px',
                    lineHeight: '20px',
                }}>ARTRAM
                    <div
                        css={{
                            fontFamily: 'Noto Sans',
                            fontSize: '12px',
                            lineHeight: '12px',

                        }}>pre-alpha</div>
                </div>
            </div>
        </div>
    )


}


export default LogoWithName