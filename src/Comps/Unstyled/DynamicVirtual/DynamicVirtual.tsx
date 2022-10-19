//@ts-nocheck

import { useVirtual } from "react-virtual";
import React from "react";

var DynamicVirtual = ({ list }: props) => {

  return (
    <div style={{ height: "100%" }}>
      <RowVirtualizerDynamic rows={list}></RowVirtualizerDynamic>
    </div>
  );
};

function RowVirtualizerDynamic({ rows }) {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
  });

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `100%`,
          width: `100%`,
          overflow: "auto",
        }}
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
              {rows[virtualRow.index]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DynamicVirtual;
