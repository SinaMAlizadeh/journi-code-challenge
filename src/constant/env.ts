export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const API_BASE_URL = isLocal ? "http://localhost:3000/" :  process.env.NEXT_PUBLIC_BASE_URL;
export const IP_FINDER_BASE_API_URL =  isLocal ? "http://ip-api.com/json" : process.env.NEXT_PUBLIC_IP_FINDER_BASE_URL;