"use client";

import { KindeProvider } from "@node_modules/@kinde-oss/kinde-auth-nextjs";


export default function AuthProvider ({children}) {
    return (
        <KindeProvider>
            {children}
        </KindeProvider>
    );
}