import React from "react";
// @ts-ignore
import SanitizeHTML from "sanitize-html";

const Markup = ({ children }:any) => {
    const unsafe = React.Children.toArray(children)
        .filter((child) => typeof child === "string")
        .join("");
    let escaped = SanitizeHTML(unsafe, {
        allowedTags: [
            "blockquote",
            "p",
            "a",
            "ul",
            "ol",
            "li",
            "b",
            "i",
            "strong",
            "em",
            "strike",
            "del",
            "br",
            "div",
            "sup",
            "sub",
        ],
        allowedAttributes: {
            a: ["href", "name", "target"],
            img: ["src"],
        },
        // Lots of these won't come up by default because we don't allow them
        selfClosing: [
            "img",
            "br",
            "hr",
            "area",
            "base",
            "basefont",
            "input",
            "link",
            "meta",
        ],
        // URL schemes we permit
        allowedSchemes: ["http", "https", "ftp", "mailto"],
        allowedSchemesByTag: {},
    });
    return (
        <div
            id='text'
            dangerouslySetInnerHTML={{
                __html: escaped,
            }}
        />
    );
};

export default Markup;