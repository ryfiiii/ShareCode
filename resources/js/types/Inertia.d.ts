import { AlertColor, Post, User } from ".";

export type InertiaPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user?: User;
    };
    errors?: {
        [key: string]: string;
    };
    flash: {
        message?: string;
        color?: AlertColor;
    };
    posts?: {
        items: Post[];
        next_page_url: string | null;
    };
    post?: Post;
    [key: string]: unknown;
};
