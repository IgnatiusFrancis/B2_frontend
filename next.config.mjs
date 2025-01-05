// /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.dummyjson.com", "res.cloudinary.com"],
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["cdn.dummyjson.com", "res.cloudinary.com"],
//   },
//   // Add these lines
//   reactStrictMode: true,
//   staticPageGenerationTimeout: 0,
//   // Disable page transitions
//   experimental: {
//     scrollRestoration: false
//   }
// };

// export default nextConfig;