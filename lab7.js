const URL_API = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";
fetch(URL_API)
    .then(response => {

        if (!response.ok) {
            throw new Error("Could not fetch rosource")
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error))
