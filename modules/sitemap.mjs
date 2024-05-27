import { $fetch } from 'ofetch'
import * as fs from "fs";

const BaseUrl = "https://kidup.kz"

const createRoutes = ({categories, lessons, subjects, centers}) => {
    return [
        // Статичные
        `${BaseUrl}/main`,
        `${BaseUrl}/catalog`,
        `${BaseUrl}/catalog/almaty`,

        // Центры по категориям
        `${BaseUrl}/catalog/almaty/centers`,
        ...categories.map(category => `${BaseUrl}/catalog/almaty/centers/${category.replace(" ", "")}`),

        // Уроки по категориям
        `${BaseUrl}/catalog/almaty/lessons`,
        ...subjects.map(subject => `${BaseUrl}/catalog/almaty/lessons/${subject.replace(" ", "")}`),

        // Детали уроков
        ...lessons.map(lesson => `${BaseUrl}/catalog/details/lessons-${lesson}`),

        // Детали центра
        ...centers.map(center => `${BaseUrl}/catalog/details/center-${center}`),
    ]
}

export default async (_, nuxt) => {
    if (process.env.NODE_ENV !== 'production') return
    const response = await $fetch(process.env.BACKEND_URL+ "/seo/options").catch(() => {})
    if (!response?.body) return;
    const {categories, lessons, subjects, centers} = response.body;

    const routes = createRoutes({categories, lessons, subjects, centers});

    let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'
    xml += routes.map(route => `<url><loc>${route}</loc></url>`).join("")
    xml += '</urlset>'

    await fs.writeFileSync("./public/sitemap.xml", xml);
}