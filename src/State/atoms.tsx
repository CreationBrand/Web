import { atom } from "recoil";

// LAYOUT
export const overlayState = atom({
  key: "overlayState",
  default: { type: "post", open: false } as overlayProps,
});
export interface overlayProps {
  type: overlayType;
  open: boolean;
  community_id?: string;
  post_id?: number;
  comment_id?: number;
}
export const navState = atom({
  key: "navState",
  default: {} as navStateI,
});


// USER DATA
export const personState = atom({
  key: "personState",
  default: {} as personStateI,
});
export const communityState = atom({
  key: "communityState",
  default: {},
});
export const messengerState = atom({
  key: "messengerState",
  default: {} as personStateI,
});
export const roleState = atom({
  key: "roleState",
  default: {} as personStateI,
});

// UPDATER STATES
export const userUpdate = atom({
  key: "userUpdate",
  default: {} as any,
});




interface personStateI {
  public_id: number;
  username: string;
  nickname: string;
  karma: number;
  comments: number;
  posts: number;
  created_at: string;
  updated_at: string;
}
interface communityStateI {
  id: number;
  title: string;
  description: string;
  roles: communityRoleI[];
  subscribers: number;
  created_at: string;
  updated_at: string;
}
interface communityRoleI {
  role_id: number;
  title: string;
  color: number;
  grounded: true;
  permissions: number;
}
interface roleStateI {
  id: number;
  title: string;
  color: number;
  permissions: number;
}
interface messengerStateI {
  leader: number;
  members: memberI[];
  messenger_id: number;
  status: string;
  title: string;
}
interface memberI {
  karma: number;
  nickname: string;
  username: string;
}

type overlayType = "post" | "comment" | "imageEdit";

interface navStateI {
  url: string;
  title: string;
  type: navType;
}
type navType = "post" | "comment" | "imageEdit" | "community";
