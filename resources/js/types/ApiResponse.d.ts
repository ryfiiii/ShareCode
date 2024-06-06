import { AlertColor } from ".";

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
