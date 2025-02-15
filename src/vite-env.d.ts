/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_APP_API_URL: string;
    VITE_APP_BASE_URL: string;
    VITE_APP_API_2GIS: string
    VITE_KEY_2GIS: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}