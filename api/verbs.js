import { encode as btoa } from 'base-64'

import { API_URL } from './environment'
import { setCredentials } from './credentials'

export const get = async path => {
  const response = await fetch(`${API_URL}/${sanitizePath(path)}`, {
    headers: new Headers({
      credentials: 'include',
    }),
  })

  if (response.status === '401') await logout()

  return response
}

export const post = async (path, body) => {
  const response = await fetch(`${API_URL}/${sanitizePath(path)}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      credentials: 'include',
    }),
    body,
  })

  if (response.status === '401') await logout()

  return response
}

export const deleteById = async path => {
  const response = await fetch(`${API_URL}/${sanitizePath(path)}`, {
    method: 'DELETE',
    headers: new Headers({
      credentials: 'include',
    }),
  })

  if (response.status === '401') await logout()

  return response
}

export const isLoggedIn = async () => {
  const response = await fetch(`${API_URL}/user/me`, {
    headers: new Headers({
      credentials: 'include',
    }),
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

export const logout = async () => {
  await setCredentials(null)
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
