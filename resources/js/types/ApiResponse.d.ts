import { AlertColor } from ".";

export interface PostResponse {
    color: AlertColor;
    message: string;
    url: string;
}