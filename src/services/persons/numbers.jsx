import axios from 'axios'

const getAll = () => {
  const request = axios.get(
    'https://first-node-server-orpin.vercel.app/api/people'
  )
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(
    'https://first-node-server-orpin.vercel.app/api/people',
    newObject
  )
  return request.then((response) => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(
    `https://first-node-server-orpin.vercel.app/api/people/${id}`
  )
  return request.then(() => getAll())
}

const update = (id, newObject) => {
  const request = axios.put(
    `https://first-node-server-orpin.vercel.app/api/people/${id}`,
    newObject
  )
  return request.then((response) => response.data)
}
export { getAll, create, deletePerson, update }
