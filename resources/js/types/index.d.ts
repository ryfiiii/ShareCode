export type AlertColor = 'success' | 'error' | 'warning' | 'info';

export interface User {
    name: string;
    email: string;
    avatar: string;
    favorite_language: string;
}

export interface Post {
    id: number;
    slug: string;
    user_id: number;
    title: string;
    comment: string;
    code: string;
    language: string;
    likes: number;
    publish_status: number;
    is_draft: number;
    published_at: string;
    created_at: string;
    updated_at: string;
    user: User;
}