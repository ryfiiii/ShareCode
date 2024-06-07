import { AlertColor, Post } from ".";

export interface SettingResponse {
    avatar?: string;
    name?: string;
    favorite_language?: string;
    message: string;
    color: AlertColor;
}

export interface PostResponse {
    message: string;
    url: string;
}

export interface PostGetResponse {
    posts: {
        items: Post[];
        next_page_url: string | null;
    }
}