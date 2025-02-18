import { notFound } from 'next/navigation';
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

async function getAutrici(notFound: any) {
    try {
        const pages = await directus.request(
            readItems("autrici", {
                filter: {
                    status: "published",
                },
            })
        );
        if (!pages) {
            throw new Error("Page not found");
        }
        return pages;
    } catch (error) {
        console.error("errori", error);
        if (error) return notFound();
    }
}
async function getOpere() {
    try {
        const opere = await directus.request(
            readItems("opere", {
                filter: {
                    status: "published",
                    in_homepage: true,
                },
            })
        );
        console.log(opere, "opere");
        return opere;
    } catch (error) {
        console.error("errori", error);
    }
}
async function getOpereAutrici() {
    try {
        const opere_autrici = await directus.request(
            readItems("opere_autrici", {

            })
        );

        return opere_autrici;
    } catch (error) {
        console.error("errori", error);
    }
}
async function getCitazioni() {
    try {
        const opere_autrici = await directus.request(
            readItems("citazioni", {
                filter: {

                    in_homepage: true,
                },

            })
        );

        return opere_autrici;
    } catch (error) {
        console.error("errori", error);
    }
}
async function getAutriciCitazioni() {
    try {
        const opere_autrici = await directus.request(
            readItems("autrici_citazioni", {

            })
        );

        return opere_autrici;
    } catch (error) {
        console.error("errori", error);
    }
}
async function getTemi() {
    try {
        const opere_autrici = await directus.request(
            readItems("temi", {
                filter: {
                    in_homepage: true
                }
            })
        );

        return opere_autrici;
    } catch (error) {
        console.error("errori", error);
    }
}
async function getTemiAutrici() {
    try {
        const opere_autrici = await directus.request(
            readItems("temi_autrici", {

            })
        );

        return opere_autrici;
    } catch (error) {
        console.error("errori", error);
    }
}
export { getAutrici, getOpere, getOpereAutrici, getCitazioni, getAutriciCitazioni, getTemi, getTemiAutrici };