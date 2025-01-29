
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'b2xclusive-bucket.s3.eu-north-1.amazonaws.com',
        // pathname: '/public/**',

        protocol: "https",
        hostname: "**", 
        
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        
      },
      {
         protocol: 'https',
        hostname: 'res.cloudinary.com',
        
      },
    ],
  },
};


export default nextConfig;
