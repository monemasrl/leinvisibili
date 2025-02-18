import { notFound } from 'next/navigation';
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

async function getDataFromApi(type: string, filter: object = {}, limit: number = -1) {
    try {
        const opere = await directus.request(
            readItems(type, {
                filter: filter || {},
                limit: -1


            })
        );

        return opere;
    } catch (error) {
        error && console.error("errori", error);
        if (error) return notFound();
    }
}
export { getDataFromApi };