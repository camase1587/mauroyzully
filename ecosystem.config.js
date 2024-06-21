module.exports = {
  apps: [
    {
      name: 'mauroyzully',
      script: 'dist/index.js', // El archivo de entrada de tu aplicación compilada
      watch: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
