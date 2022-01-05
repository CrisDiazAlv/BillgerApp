import { encode as btoa } from 'base-64'

import { API_URL } from './environment'
import { setCredentials, getCredentials } from './credentials'

export const get = async path => {
  const credentials = await getCredentials()
  if (!credentials) throw new Error('Credentials not found')

  const response = await fetch(`${API_URL}/${sanitizePath(path)}`, {
    headers: new Headers({
      Authorization: `Basic ${credentials}`,
      credentials: 'include',
    }),
  })
  return response
}

export const post = async (path, body) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  const credentials = await getCredentials()
  if (credentials) headers.append({ Authorization: `Basic ${credentials}` })

  const response = await fetch(`${API_URL}/${sanitizePath(path)}`, {
    method: 'POST',
    headers,
    body,
  })

  return response
}

export const login = async (username, password) => {
  const credentials = btoa(username + ':' + password)
  await setCredentials(credentials)

  const response = await fetch(`${API_URL}/user/me`, {
    headers: new Headers({
      Authorization: `Basic ${credentials}`,
    }),
  })
  return response
}

const sanitizePath = path => {
  if (!path || path.trim() === '') {
    throw new Error('Path cannot be null nor empty')
  }

  if (path.charAt(0) === '/') {
    path = path.substring(1)
  }
  return path
}
