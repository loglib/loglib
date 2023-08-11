/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client"
/// <reference types="lucia" />

declare global {
    namespace Lucia {
        type Auth = import("$lib/services/auth/lucia").Auth;
        type DatabaseUserAttributes = {
            name: string | null;
            email: string | null;
            image: string | null;
            createdAt?: Date;
            updatedAt?: Date;
        };
        type DatabaseSessionAttributes = Record<string, never>;
    }
    namespace App {
        interface Locals {
            auth: import("lucia").AuthRequest;
        }
    }
}

export {};
