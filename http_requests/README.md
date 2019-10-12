# H1 AXIOS HTTP Requests

### Documentacion oficial

[Link](https://github.com/axios/axios)

### Projecto en linea

[Link](https://angel2h.com/web/axios/)

#### Ejemplo de una peticion GET

```
// Usando Async / Await
async function getUsersAsync() {
    try {
        const axiosResponse = await axios.get(`${api_url}/users/`);
        const data = axiosResponse.data;
    } catch (err) {
        console.log(err)
    }
}

// Usando CALLBACKS
function getUsers() {
    axios
        .get(`${api_url}/users`)
        .then(axiosResponse => {
            const data = axiosResponse.data;
        })
        .catch(err => {
            console.log(err)
        });
}

```
