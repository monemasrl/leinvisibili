
import directus from "@/lib/directus";
import { tAutrice, tAutriciOpere, tOpera } from "@/type";
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
async function getDataAutriciOpere() {
    // dati autrici
    const autriciData = await getDataFromApi("autrici", {
        status: "published",
    });
    // dati opere
    const opereData = await getDataFromApi("opere", {
        status: "published",
    });
    // dati autrici_opere
    const autriciOpere = await getDataFromApi("autrici_opere_1", {});

    /**
     * Cicla le opere e per ognuna cerca l'id dell'autrice
     * filtra l'array autriciOpere per trovare l'id dell'autrice che hanno in comune l'opera
     * e crea un arrai con solo gli id delle autrici
     * 
     * cilca l'array autriciId e fa un find sull' array autriciData per trovare i dati dell'autrice
     * ritorna un array con le opere e i dati delle autrici
     */
    const autriciIdPerOpere = opereData.map((opera: tOpera) => {
        const autriceId = autriciOpere.filter((autriceOpere: tAutriciOpere) => autriceOpere.opere_id === opera.id).map((autriceOpere: tAutriciOpere) => autriceOpere.autrici_id)
        const datiAutrice = autriceId.map((id: number) => { return autriciData.find((autrice: tAutrice) => autrice.id === id) })
        return { opera: opera.titolo, autriceId: datiAutrice && datiAutrice }
    })
    return autriciIdPerOpere
}
export { getDataFromApi, getDataAutriciOpere };