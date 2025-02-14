
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
    pseudonimi: string | null;
    data_di_nascita: string;
    data_di_morte: string;
    immagine_principale: string;
    slug: string;
    luogo_nascita: number;
    luogo_morte: number | null;
    Contenuto: string;
    fonti: string | null;
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

export type { tOpera, tAutrice, tOpereAutrici }