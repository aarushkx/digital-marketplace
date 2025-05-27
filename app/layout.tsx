import type { Metadata } from "next";
import { Gilda_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/context/Providers";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/lib/constants";

const gildaDisplay = Gilda_Display({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-gilda-display",
});

export const metadata: Metadata = {
    title: `${APP_NAME} - ${APP_TAGLINE}`,
    description: APP_DESCRIPTION,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${gildaDisplay.variable} antialiased`}>
                <Providers>
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    );
}
