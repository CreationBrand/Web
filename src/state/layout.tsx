import { atom } from "recoil";

export const desktopControl = atom({
    key: "desktopControl",
    default: [true, true] as any,
});

export const layoutSize = atom({
    key: "layoutControl",
    default: "desktop" as any,
});

export const mainSize = atom({
    key: "mainSize",
    default: "desktop" as any,
});