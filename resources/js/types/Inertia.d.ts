import { AlertColor } from ".";

export interface User {
    name: string;
    email: string;
    avatar: string;
}

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
    }
};
