module.exports = {
  apps: [
    {
      name: 'reinsurance',
      exec_mode: 'cluster',
      port: '3005',
      instances: 1, // Or a number of instances
      script: '.output/server/index.mjs'
    }
  ]
}
