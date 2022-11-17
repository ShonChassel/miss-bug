import { storageService } from './async-storage-service.js'

const STORAGE_KEY = 'bugDB'

export const bugService = {
  query,
  getById,
  getEmptyBug,
  save,
  remove,
}

const BASE_URL = `/api/bug/`



function query(filterBy) {
  console.log('filterBy', filterBy);
  return axios.get(BASE_URL, { params: filterBy }).then(res => res.data)
}

function getById(bugId) {
  return axios.get(BASE_URL + bugId).then(res => res.data)
}

function getEmptyBug() {
  return {
    title: '',
    severity: '',
  }
}

function remove(bugId) {
  return axios.delete(BASE_URL + bugId).then(res => res.data)
}

function save(bug) {
console.log('bug',bug )
  if (bug._id) {
    return axios.put(BASE_URL + bug._id, bug).then(res => res.data)
  } else {
    return axios.post(BASE_URL, bug).then(res => res.data)
  }
  // const url = BASE_URL + 'save'
  //   var queryParams = `?title=${bug.title}&severity=${bug.severity}&description=${bug.description}`
  //   if (bug._id) queryParams += `&_id=${bug._id}`

  //   return axios.get(url + queryParams).then(res=>res.data)
}
