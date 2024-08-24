/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    //trailingSlash: true,
    // Optional: Change the output directory `out` -> `dist`
    //distDir: 'dist',
    eslint: {
        dirs: ['app', ],
    },
};

export default nextConfig;
