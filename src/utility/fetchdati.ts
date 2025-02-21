
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

async function getDataFromApi(type: string, filter: object = {}, limit: number = -1, offset: number = 0) {
    try {
        const opere = await directus.request(
            readItems(type, {
                filter: filter || {},
                limit: limit,
                offset: offset,
            })
        );
        return opere;
    } catch (error: any) {
        console.error("errori", error);
        return error
    }
}
export { getDataFromApi };