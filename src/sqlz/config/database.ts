import * as config from './config.json';

require('dotenv/config');

type Keys = 'development' | 'production' | 'test';

const key = (process.env.NODE_ENV as Keys) || 'development';

export default {
    ...config[key],
} as any;
