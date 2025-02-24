
import directus from "@/lib/directus";
import { tAutrice, tAutriciOpere, tOpera } from "@/type";
import { readItems } from "@directus/sdk";

async function getDataFromApi(type: string, filter: object = {}, limit: number = -1, offset: number = 0) {

    const opere = await directus.request(
        readItems(type, {
            filter: filter || {},
            limit: limit,
            offset: offset,
        })
    );

    if (!opere) {
        console.error("errore collegamento al database");
    }
    else { return opere; }


}
async function getDataAutriciOpere(operaTitolo: string) {
    // dati autrici
    const autriciData = await getDataFromApi("autrici", {
        status: "published",
    });
    // dati opere per titolo ricercato
    const dataOpere: tOpera[] = (await getDataFromApi("opere", {
        status: "published",
        titolo: { _contains: operaTitolo },
    }) as tOpera[]) || [];
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
    const autriciIdPerOpere = dataOpere?.map((opera) => {
        const autriceId = (autriciOpere as tAutriciOpere[])?.filter((autriceOpere: tAutriciOpere) => autriceOpere.opere_id === opera.id).map((autriceOpere) => autriceOpere.autrici_id)
        const datiAutrice = autriceId?.map((id) => { return autriciData?.find((autrice) => autrice.id === id) })
        return { opera: opera.titolo, autrice: datiAutrice && datiAutrice }
    })
    return autriciIdPerOpere
}
export { getDataFromApi, getDataAutriciOpere };