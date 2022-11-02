

export interface person {
  public_id: number;
  username: string;
  nickname: string;
  karma: number;
  comments: number;
  posts: number;
  created_at?: string;
  updated_at?: string;
}