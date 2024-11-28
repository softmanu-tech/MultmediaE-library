"use client";

import {NextUIProvider} from "@nextui-org/system";
import {useRouter} from "next/navigation";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";
import React from "react";

export interface ProvidersProps {
    children: React.ReactNode,
    themeProps?: ThemeProviderProps,
    attribute?: string,
    defaultTheme?: string,
    enableSystem?: boolean
}

export function Providers({children, themeProps,attribute, defaultTheme, enableSystem}: ProvidersProps) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
    );
}
