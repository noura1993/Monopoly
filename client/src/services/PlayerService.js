const basePropertiesURL = 'http://localhost:3000/api/properties/';
const baseQuotesURL = 'http://localhost:3000/api/chanceCards/';
const basePlayersURL = 'http://localhost:3000/api/players/';

export default {
    getProperties() {
        return fetch(basePropertiesURL)
        .then(res => res.json());
    },

    getPlayers() {
        return fetch(basePlayersURL)
        .then(res => res.json())
    },

    getQuotes() {
        return fetch(baseQuotesURL)
        .then(res => res.json())
    },

    addPlayer(player) {
        return fetch(basePlayersURL, {
            method: 'POST',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
    },

    updatePlayer(player) {
        return fetch(basePlayersURL + player._id, {
            method: 'PUT',
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    },

    deletePlayer(id) {
        return fetch(basePlayersURL + id, {
            method: 'DELETE',
        })
            // .then(res => res.json());
    },

    deletePlayers() {
        return fetch(basePlayersURL, {
            method: 'DELETE'
        })
    }
}