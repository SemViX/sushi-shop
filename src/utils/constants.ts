import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import { ROUTES } from "./routes";
import { link } from "fs";

export const BASE_DIR = 'http://localhost:3000/api'

export const HEADER_LINKS = [
    {id: 0, title:'Головна', link: ROUTES.main},
    {id: 1, title:'Меню', link: ROUTES.products},
    {id: 2, title:'Знижки', link: ROUTES.discounts},
    {id: 3, title:'Про нас', link: ROUTES.about_us},

]

export const SOCIALS = [
    {id: 0, link: 'https:/facebook.com', icon: FacebookIcon},
    {id: 1, link: 'https:/instagram.com', icon:InstagramIcon},
    {id: 2, link: 'https:/youtube.com', icon:YoutubeIcon}
]