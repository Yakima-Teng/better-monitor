// 前端域名
export const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN as string;

// 后端域名
export const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN as string;
export const MODE: string = process.env.MODE as string;
export const NODE_ENV: string = process.env.NODE_ENV as string;
export const buildDate: string = process.env.BUILD_DATE as string;
export const buildVersion: string = process.env.BUILD_VERSION as string;

export const API_PREFIX = `${BACKEND_DOMAIN}/api/bugs/`;
