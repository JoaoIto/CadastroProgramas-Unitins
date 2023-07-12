import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    uri: 'mongodb://127.0.0.1:27017/softwarehub',
}));
