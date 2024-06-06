/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_CHATBOT_API_URL: process.env.NEXT_PUBLIC_CHATBOT_API_URL,
        NEXT_PUBLIC_GCPEC_LEGADO_URL: process.env.NEXT_PUBLIC_GCPEC_LEGADO_URL,
        NEXT_PUBLIC_GCPEC_URL: process.env.NEXT_PUBLIC_GCPEC_URL,
        NEXT_PUBLIC_CHATBOT_API_URL_WS: process.env.NEXT_PUBLIC_CHATBOT_API_URL_WS,
    }
};

export default nextConfig;
