const baseURL = 'http://localhost:3000/api/properties/'

export default {
    getProperties() {
        return fetch(baseURL)
        .then(res => res.json());
    }
}