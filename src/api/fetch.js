/////////////////////////////////////////////////////////////////////
// Generic module to fetch data 
// 1. Create an env var with base API URL
// Authentication uses the same-origin HttpOnly session cookie.
/////////////////////////////////////////////////////////////////////

const baseURL = import.meta.env.VITE_BASE_API_URL

class RequestError extends Error {
  constructor(status, statusText, data, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError)
    }

    this.name = 'RequestError'
    this.message = 'Request Error'
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}

export const fetchWrapper = async (
  url,
  { method = 'GET', data, headers, ...rest }
) => {
  const options = {
    method,
    mode: 'cors',
    credentials: 'same-origin',
    body: data,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    ...rest,
  }
  if (options.headers['Content-Type'] === 'multipart/form-data') {
    delete options.headers['Content-Type']
  }
  const response = await fetch(url, options)
  const isJson = response.headers.get('Content-Type') === 'application/json'

  const parsed = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    throw new RequestError(response.status, response.statusText, parsed)
  }
  return parsed
}

export const fetchPublic = async (url, { data, ...rest } = {}) => {
  return await fetchWrapper(baseURL + url, {
    data: JSON.stringify(data),
    ...rest,
  })
}

export const fetchPrivate = async (url, { headers, data, ...rest } = {}) => {
  return await fetchWrapper(baseURL + url, {
    data: JSON.stringify(data),
    headers,
    ...rest,
  })
}

export default fetchWrapper
