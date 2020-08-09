import axios from 'axios'

const HTTPClient = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: 'https://personal-board-node-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache'
  }
})

export { HTTPClient }
