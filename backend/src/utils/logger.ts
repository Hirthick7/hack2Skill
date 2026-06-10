import { env } from '../config/env';

export const logger = {
  info: (message: string, meta?: any) => {
    if (env.NODE_ENV === 'test') return;
    console.log(JSON.stringify({ level: 'info', message, timestamp: new Date().toISOString(), ...meta }));
  },
  error: (message: string, meta?: any) => {
    if (env.NODE_ENV === 'test') return;
    console.error(JSON.stringify({ level: 'error', message, timestamp: new Date().toISOString(), ...meta }));
  },
  warn: (message: string, meta?: any) => {
    if (env.NODE_ENV === 'test') return;
    console.warn(JSON.stringify({ level: 'warn', message, timestamp: new Date().toISOString(), ...meta }));
  }
};
