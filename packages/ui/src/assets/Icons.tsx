import { ArrowUpRight, Facebook, Github, Link, Twitter } from 'lucide-react';
import React from 'react';

export const RefIcons = {
    "vercel": () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 76 65"
            fill="none" xmlns="http://www.w3.org/2000/svg"><path
                d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#ffffff" /></svg>
    ),
    "github": () => (
        <Github size={20} />
    ),
    "twitter": () => (
        <Twitter />
    ),
    "direct": () => (
        <ArrowUpRight size={20} />
    ),
    "facebook": () => (
        <Facebook />
    ),
    default: () => (
        <Link size={20} />
    )
}