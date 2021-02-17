export default {
    SERVER: {
        PORT: process.env.SERVER_PORT
    },
    MAIL: {
        HOST: process.env.MAIL_HOST,
        PORT: parseInt(process.env.MAIL_PORT),
        AUTH: {
            USER: process.env.MAIL_USER,
            PASS: process.env.MAIL_PASS
        }
    },
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: parseInt(process.env.REDIS_PORT),
        PASSWORD: process.env.REDIS_PASSWORD
    }
};