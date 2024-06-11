export const APP_SAVE_KEY = {
    LOCALE: process.env.NEXT_PUBLIC_APP_NAME + '::locale',
    ROLE: process.env.NEXT_PUBLIC_APP_NAME + '::role',
    TOKEN_KEY: process.env.NEXT_PUBLIC_APP_NAME + '::token_key',
    REFRESH_TOKEN_KEY: process.env.NEXT_PUBLIC_APP_NAME + '::refresh_token_key',
    LOGIN_STATUS: process.env.NEXT_PUBLIC_APP_NAME + '::login_status',
    USER_DATA: process.env.NEXT_PUBLIC_APP_NAME + ':user_data',
};
export const PAGINATION = {
    PAGEKEY: 'page',
    SIZEKEY: 'size',
    DEFAULT_PAGE_SIZE: 10,
};

export const GENDER = {
    0: "Nữ",
    1: "Nam"
} as const;