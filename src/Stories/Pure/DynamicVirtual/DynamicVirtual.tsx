/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useVirtual } from "react-virtual"
import React from "react"
import { AnimatePresence } from 'framer-motion';

var DynamicVirtual = ({ rows }: any) => {
  if (rows === undefined) return <div>loading...</div>
  return <RowVirtualizerDynamic rows={rows}></RowVirtualizerDynamic>
};

function RowVirtualizerDynamic({ rows }: any) {

  const C = {
    container: css({
      overflowY:'hidden',
      overflowX:'hidden',

      height: "calc(100% - 50px)",
    }),
  }

  const parentRef = React.useRef(null);
  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
  });

  return (
    <div
      ref={parentRef}
      id="DYNAMICVIRTUAL"
      css={C.container}
    >
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            ref={virtualRow.measureRef}
            className="row"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${rows[virtualRow.index]}px`,
              transform: `translateY(${virtualRow.start}px)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
           <AnimatePresence>
            {rows[virtualRow.index]}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>

  );
}

export default DynamicVirtual;
