import axios from 'axios'

const HTTPClient = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: 'https://personal-board-node-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache'
    // apiKey: 'B08392ECA350755DBE7CC9C7D17BF2F56BCE9EF0AE2CBF84B7C01CC5D4CE180A'
  }
})

export { HTTPClient }
