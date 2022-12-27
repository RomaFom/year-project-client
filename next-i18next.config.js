// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    i18n: {
        locales: ['default', 'en', 'ar', 'he'],
        defaultLocale: 'en',
        localeDetection: false,
        localePath: path.resolve('./public/locales'),
    },
};
