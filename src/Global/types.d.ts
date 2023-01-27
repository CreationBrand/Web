
// declare global {

interface Post {
    public_id: public_id,
    title: title,
    type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'LINK';
    content: content,
    karma: karma,
    comments: comments,
    created_at: created_at,
    updated_at: updated_at,
    hot: hot,
    author: personBlob,
    community: communityBlob,
}

interface personBlob {
    public_id: public_id,
    nickname: nickname,
    username: username,
}

interface communityBlob {
    public_id: public_id,
    title: title,
    description: string,
}



// GLOBAL TYPES
type nickname = string;
type username = string;
type public_id = string;
type title = string;
type vote = number;
type content = string;
type karma = number;
type hot = number;
type comments = number;
type created_at = string;
type updated_at = string;
 



