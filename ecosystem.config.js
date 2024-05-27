module.exports = {
  apps: [
    {
      name: 'shop',
      exec_mode: 'cluster',
      port: '3004',
      instances: 1, // Or a number of instances
      script: '.output/server/index.mjs'
    }
  ]
}
