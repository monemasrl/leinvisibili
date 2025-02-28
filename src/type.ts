
type tOpera = {
    id: number;
    status: string;
    sort: number | null;
    user_created: string;
    date_created: string;
    user_updated: string;
    date_updated: string;
    autrice: number[];
    file: string;
    link: string;
    titolo: string;
    citazioni: any;
    in_homepage: boolean;
};
type tAutrice = {
    id: number;
    status: string;
    sort: number | null;
    user_created: string;
    date_created: string;
    nome: string;
    cognome: string;
    pseudonimi: { pseudonimo: string }[] | null;
    data_di_nascita: string;
    data_di_morte: string;
    immagine_principale: string;
    slug: string;
    luogo_nascita: number;
    luogo_morte: number | null;
    Contenuto: string;
    fonti: { link: string, titolo: string }[] | null;
    in_homepage: boolean;
    citazioni: string | null;
    Posizione: number;
    abstract: string;
    galleria: any[];
    opere: number[];
}
type tOpereAutrici = {
    id: number;
    opere_id: number | null;
    autrici_id: number;
};

type tCitazioni = {
    id: number;
    status: string;
    sort: number | null;
    user_created: string;
    date_created: string;
    user_updated: string | null;
    date_updated: string | null;
    citazione: string;
    opera: number;
    in_homepage: boolean;
};
type tAutriciCitazioni = {
    id: number;
    autrici_id: number | null;
    item: string;
    collection: string;
};
type tTemi = {
    id: number;
    status: string;
    sort: number | null;
    user_created: string;
    date_created: string;
    user_updated: string;
    date_updated: string;
    titolo: string;
    testo: string;
    abstract: string;
    in_homepage: boolean;
    autrici: number[];
    slug: string;
};
type tAutriciTemi = {
    id: number;
    temi_id: number | null;
    autrici_id: number;
};
type tLuoghi = {
    id: number;
    status: string;
    sort: number | null;
    user_created: string;
    date_created: string;
    user_updated: string;
    date_updated: string;
    Nome: string;
    stato: string | null;
};
type tBlog = {
    id: number;
    status: string;
    sort: number | null;
    user_created: string;
    date_created: string;
    user_updated: string;
    date_updated: string;
    titolo: string;
    data_inizio: string;
    data_fine: string;
    testo: string;
    evento: boolean;
    immagine_principale: string;
    abstract: string;
    slug: string;
};
type tAutriciOpere = {
    id: number;
    autrici_id: number;
    opere_id: number;
    sort: number | null;
};
export type { tOpera, tAutrice, tOpereAutrici, tCitazioni, tAutriciCitazioni, tTemi, tAutriciTemi, tLuoghi, tBlog, tAutriciOpere };
