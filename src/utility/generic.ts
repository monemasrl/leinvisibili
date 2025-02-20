
function formatDataFromApi(data: string, optionsObject: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
}) {
    const nascita = new Date(Date.parse(data));
    const options: Intl.DateTimeFormatOptions = optionsObject
    return nascita.toLocaleDateString("it-IT", options)
}


export { formatDataFromApi }

