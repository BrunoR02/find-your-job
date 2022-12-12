
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    if(!config.experiments){
      config.experiments = {}
    }
    config.experiments.topLevelAwait = true
    return config
  },
  images:{
    domains:["find-your-job.s3.sa-east-1.amazonaws.com"],
  }
}

module.exports = nextConfig
