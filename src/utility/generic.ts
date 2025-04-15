const alphabeth = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
]

function formatDataFromApi(data: string, optionsObject: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
}) {
    const nascita = new Date(Date.parse(data));
    const options: Intl.DateTimeFormatOptions = optionsObject
    return nascita.toLocaleDateString("it-IT", options)
}
function indiceAlfabetico(lista: any, type: 'temi' | 'autrici') {
    // Crea un indice array di oggetti con lettera e data
    const dati = alphabeth.map((lettera, index) => {

        let dataPerLettera = [];
        dataPerLettera = [
            ...lista?.filter(
                (item: any) => {

                    if (type === 'temi') {

                        return item.titolo[0].toLowerCase() === lettera.toLowerCase()
                    }
                    else {

                        return item.nome[0].toLowerCase() === lettera.toLowerCase()
                    }
                }
            ),
        ];

        return { lettera: lettera, data: dataPerLettera };
    });
    return dati;
}

export { formatDataFromApi, indiceAlfabetico }

