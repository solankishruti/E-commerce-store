const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://127.0.0.1:8080' : 'http://127.0.0.1:8080';