
import directus from "@/lib/directus";
import { tAutrice, tAutriciOpere, tOpera } from "@/type";
import { readItems } from "@directus/sdk";

async function getDataFromApi(type: string, filter: { opera?: string, nome?: string, cognome?: string, status?: string } = {}, limit: number = -1, offset: number = 0) {
    console.log(type, filter, limit, offset)
    if (type === 'opere') {
        const data = await directus.request(
            readItems(type, {
                filter: {
                    "titolo": { _contains: filter.opera },
                },
                limit: limit,
                offset: offset,
            })
        );

        if (!data) {
            console.error("errore collegamento al database");
        }
        else { return data; }
    } else if (type === 'autrici' || type === 'autrici_opere_1') {
        const data = await directus.request(
            readItems(type, {
                filter: {

                    "_or": [
                        { "nome": { _contains: filter.nome?.length ? filter.nome : undefined } },
                        { "cognome": { _contains: filter.cognome?.length ? filter.cognome : undefined } }
                    ]
                },
                limit: limit,
                offset: offset,
            })
        );

        if (!data) {
            console.error("errore collegamento al database");
        }
        else { return data; }
    }


}
async function getDataAutriciOpere(datiPerRicerca: { opera?: string, nome?: string, titolo?: string }) {
    console.log('autrici opere')
    // dati autrici
    const autriciData = await getDataFromApi("autrici", {
        status: "published",
    });
    // dati opere per titolo ricercato
    const dataOpere: tOpera[] = (await getDataFromApi("opere", {
        status: "published",
        opera: datiPerRicerca.opera,
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

    if (dataOpere) {
        const autriciIdPerOpere = dataOpere?.map((opera) => {
            const autriceId = (autriciOpere as tAutriciOpere[])?.filter((autriceOpere: tAutriciOpere) => autriceOpere.opere_id === opera.id).map((autriceOpere) => autriceOpere.autrici_id)
            const datiAutrice = autriceId?.map((id) => { return autriciData?.find((autrice) => autrice.id === id) })
            return { opera: opera.titolo, autrice: datiAutrice && datiAutrice }
        })
        return autriciIdPerOpere
    }

}
export { getDataFromApi, getDataAutriciOpere };