import { InjectionToken } from "@angular/core";

export interface AppConfig {
    API_URL: string;
    API_KEY: string;
}

export const config = {
    API_URL: '',
    API_KEY: '',
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG')