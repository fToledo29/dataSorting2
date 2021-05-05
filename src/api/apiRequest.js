const apiURL = 'https://rickandmortyapi.com/api/character';

class API {
	static getData() {
		console.log('calling: ', apiURL);
		return fetch(apiURL)
		.then(res => res.json());
	}
}

export default API;