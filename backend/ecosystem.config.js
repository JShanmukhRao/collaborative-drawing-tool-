module.exports = {
  apps: [
    {
      name: '',
      autorestart: true,
      script: './main.js',
      watch: '.',
      ignore_watch: ['node_modules', '.git'],
      out_file: '/dev/null',
      error_file: '/dev/null',
      env: {
        watch: true,
        NODE_ENV: 'development',
      },
      env_production: {
        watch: false,
        NODE_ENV: 'production',
      },
    },
  ],
};
