module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 2120),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // url: env('PUBLIC_URL', 'https://strapi-backend-lhba.onrender.com'), // Change this to your public URL
  // admin: {
  //   url: env('ADMIN_URL', '/admin'), // The path to access the admin panel
  // },
  // proxy: true, // Enable proxy if you are behind a proxy
});
