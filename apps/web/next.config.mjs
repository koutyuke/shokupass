/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@shokupass/ui", "@shokupass/api-contracts", "@mantine/core", "@mantine/hooks"],
  images: {
    domains: ["localhost", "127.0.0.1"],
  }
};

export default config;
