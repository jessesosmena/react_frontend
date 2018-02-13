const token = localStorage.getItem('token');

console.log(token)

const getHeaders = function getHeaders () {

	const headers = { // headers object

		'Accept': 'application/json', 

		'Authorization': 'Bearer ' + token // send bearer token
	}

	return headers
}

export default getHeaders 
