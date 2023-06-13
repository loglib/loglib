import { ArrowUpRight, Facebook, Github, Instagram, Link, Twitter } from 'lucide-react';
import React from 'react';

export const RefIcons = {
    "vercel": () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 76 65"
            fill="none" xmlns="http://www.w3.org/2000/svg"><path
                d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#ffffff" /></svg>
    ),
    "github": () => (
        <Github size={18} />
    ),
    "twitter": () => (
        <Twitter size={18} />
    ),
    "direct": () => (
        <ArrowUpRight size={18} />
    ),
    "facebook": () => (
        <Facebook size={18} />
    ),
    "google": () => (
        <svg viewBox="0 0 48 48" width={16} height={16} className=' stroke-black stroke-2 dark:stroke-white fill-none' id="b" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">defs<path d="m31.6814,34.8868c-1.9155,1.29-4.3586,2.0718-7.2514,2.0718-5.59,0-10.3395-3.7723-12.04-8.8541v-.0195c-.43-1.29-.6841-2.6582-.6841-4.085s.2541-2.795.6841-4.085c1.7005-5.0818,6.45-8.8541,12.04-8.8541,3.1664,0,5.9809,1.0945,8.2286,3.2055l6.1568-6.1568c-3.7332-3.4791-8.5805-5.6095-14.3855-5.6095-8.4045,0-15.6559,4.8277-19.1936,11.8641-1.4659,2.8927-2.3064,6.1568-2.3064,9.6359s.8405,6.7432,2.3064,9.6359v.0195c3.5377,7.0168,10.7891,11.8445,19.1936,11.8445,5.805,0,10.6718-1.9155,14.2291-5.1991,4.0655-3.7527,6.4109-9.2645,6.4109-15.8123,0-1.5245-.1368-2.9905-.3909-4.3977h-20.2491v8.3264h11.5709c-.5082,2.6777-2.0327,4.945-4.3195,6.4695h0Z"></path></g></svg>
    ),
    telegram: () => (
        <svg width="18px" className=' stroke-black stroke-2 dark:stroke-white fill-none' height="18px" viewBox="0 0 48 48" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg"><path d="M40.83,8.48c1.14,0,2,1,1.54,2.86l-5.58,26.3c-.39,1.87-1.52,2.32-3.08,1.45L20.4,29.26a.4.4,0,0,1,0-.65L35.77,14.73c.7-.62-.15-.92-1.07-.36L15.41,26.54a.46.46,0,0,1-.4.05L6.82,24C5,23.47,5,22.22,7.23,21.33L40,8.69a2.16,2.16,0,0,1,.83-.21Z" /></svg>
    ),
    instagram: () => (
        <Instagram size={16} />
    ),
    default: () => (
        <Link size={18} />
    )
}