import directus from "@/lib/directus";
import { tAutrice, tAutriciOpere, tOpera } from "@/type";
import { readItems } from "@directus/sdk";
type tFilter = { opera?: string, nome?: string, cognome?: string, status?: string, slug?: string, in_homepage?: boolean, autrici_id?: number, id?: any, blog_id?: number, fields?: string[] };
async function getDataFromApi(type: string, filter: tFilter = {}, limit: number = -1, offset: number = 0, fields: string[] = []) {

    if (type === 'opere' && filter.opera) {
        const data = await directus.request(
            readItems(type, {
                filter: {
                    "titolo": { _contains: filter.opera },
                },
                limit: limit,
                offset: offset,
                ...(fields.length > 0 && { fields: fields }),
            })
        );

        if (!data) {
            console.error("errore collegamento al database");
        }
        else { return data; }
    } else if (type === 'autrici' || type === 'autrici_opere_1') {
        const data = await directus.request(
            readItems(type, {
                filter: type === 'autrici' ? {
                    "_and": [
                        { "nome": { _icontains: filter.nome?.length ? filter.nome : undefined } },
                        { "cognome": { _icontains: filter.cognome?.length ? filter.cognome : undefined } }
                    ],
                    "status": { "_eq": "published" },

                } : {
                    "_and": [
                        { "nome": { _icontains: filter.nome?.length ? filter.nome : undefined } },
                        { "cognome": { _icontains: filter.cognome?.length ? filter.cognome : undefined } }
                    ],
                },
                limit: limit,
                offset: offset,
                ...(fields.length > 0 && { fields: fields }),
            })
        );

        if (!data) {
            console.error("errore collegamento al database");
        }
        else { return data; }
    } else if (type === "autrici_files") {
        const data = await directus.request(
            readItems(type, {
                filter: {
                    "autrici_id": { _eq: filter.autrici_id ? filter.autrici_id : undefined }
                },
                fields: [
                    'id',
                    'autrici_id',
                    'directus_files_id',
                    'directus_files_id.id',
                    'directus_files_id.title',
                    'directus_files_id.description',
                    'directus_files_id.filename_download',
                    'directus_files_id.type'
                ],
                limit: limit,
                offset: offset,
            })
        );
        if (!data) {
            console.error("errore collegamento al database");
        }
        else { return data; }
    } else {
        const data = await directus.request(
            readItems(type, {
                filter: filter || {},
                limit: limit,
                offset: offset,
                ...(fields.length > 0 && { fields: fields }),
            })
        );

        if (!data) {
            console.error("errore collegamento al database");
        }
        else { return data; }
    }


}
async function getDataAutriciOpere(datiPerRicerca: { opera?: string, nome?: string, titolo?: string }) {

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

async function getDataAutriciPage(slug: string) {

    const data = await directus.request(
        readItems('autrici', {
            filter: {
                "slug": { "_eq": slug },
                "status": "published",
            }
        })
    );

    if (!data) {
        console.error("errore collegamento al database");
    }
    else { return data; }
}

async function getDataLuoghi() {
    const data = await directus.request(
        readItems('luoghi', {
            filter: {
                status: "published",
            }
        })
    );

    if (!data) {
        console.error("errore collegamento al database");
    }
    else { return data; }
}
async function getOpere() {
    const data = await directus.request(
        readItems('opere', {
            filter: {
                status: "published",
            }
        })
    );

    if (!data) {
        console.error("errore collegamento al database");
    }
    else { return data; }
}
async function getTemi(slug: string) {
    const data = await directus.request(
        readItems('temi', {
            filter: {
                status: "published",
                slug: slug
            }
        })
    );
    if (data) {
        return data
    }
    else {
        console.error("errore collegamento al database");
    }
}
export { getDataFromApi, getDataAutriciOpere, getDataAutriciPage, getDataLuoghi, getOpere, getTemi };