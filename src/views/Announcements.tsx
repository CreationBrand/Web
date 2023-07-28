/** @jsxImportSource @emotion/react */
import Pane from '@/layouts/Pane';
import { css } from '@emotion/react';

import { Outlet } from 'react-router-dom';


const C = {
    inner: css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '32px 12px 48px 12px',
    }),

}

const Announcements = () => {

    return (
        <Pane>
            <Outlet />

            <div css={C.inner}>

                <h1>Content, Terms & Licensing...</h1>

                <p>
                    Please take the time to thoroughly review the crucial information regarding our licensing terms of use and other policies provided on this page.
                </p>

                <div css={{
                    marginBottom: "12px",
                    fontSize: "14px",
                    fontWeight: 450,
                    lineHeight: "20px",
                    color: "#a298f7"
                }}>Last updated July 11, 2023</div>

                <h2>Content</h2>

                <p>
                    We take the posting of illegal content very seriously and have a strict policy in place to ensure that our platform is not used for such purposes. As such, we reserve the right to remove any content that we deem to be illegal.
                </p>

                <h2>Site Rules</h2>

                <p><strong>Rule 1: </strong> Be respectful. Artram is for fostering community, not attacking marginalized groups. No harassment, bullying, or promoting violence.</p>

                <p><strong>Rule 2: </strong> Follow community rules. Share genuine content, don't cheat, manipulate, or disrupt Artram communities.</p>

                <p><strong>Rule 3: </strong> Respect privacy. No harassment or sharing personal/confidential info without consent.</p>

                <p><strong>Rule 4: </strong> Protect minors. No sharing or encouraging sexual or abusive content involving minors.</p>

                <p><strong>Rule 5: </strong> Label appropriately. Clearly mark graphic, explicit, or offensive content/communities.</p>

                <p><strong>Rule 6: </strong> Stay legal. No posting or soliciting illegal content or transactions.</p>

                <p><strong>Rule 7: </strong> Respect functionality. Don't disrupt or harm Artram's normal use.</p>

                <h2>Intellectual property</h2>

                <p>
                    Artram has not committed to any specific licenses. However, users retain ownership and control over their copyrighted content or information submitted to Artram. Artram respects users' intellectual property rights, does not claim ownership over their original works, and acknowledges the importance of transparent and ethical treatment of intellectual property.
                </p>

                <h2>Disclaimer</h2>

                <p>Artram does not provide any express or implied representation or warranty. Your use of the site is entirely at your own risk. The site may contain links to third-party content, which we do not endorse, warrant, or assume liability for.
                </p>

            </div>
        </Pane >
    )

}


export default Announcements


