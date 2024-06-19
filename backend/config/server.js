module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('PUBLIC_URL', 'http://0.0.0.0:1337'), // Change this to your public URL
  admin: {
    url: env('ADMIN_URL', '/admin'), // The path to access the admin panel
  },
  proxy: true,
});
