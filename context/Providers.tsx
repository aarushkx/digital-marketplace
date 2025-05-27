"use client";

import React from "react";
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const authenticator = async () => {
        try {
            const response = await fetch("/api/imagekit-auth");
            if (!response.ok) {
                throw new Error("Failed to authenticate");
            }
            return response.json();
        } catch (error) {
            console.error("ImageKit authentication error:", error);
            throw error;
        }
    };

    return (
        <SessionProvider refetchInterval={5 * 60}>
            <ImageKitProvider
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
                publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!}
                authenticator={authenticator}
            >
                {children}
            </ImageKitProvider>
        </SessionProvider>
    );
};

export default Providers;
