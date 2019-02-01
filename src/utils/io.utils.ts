import { message } from 'antd';

const baseUrl = '/api'

const defaultOptions: RequestInit = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json'
  }
}

export async function io<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = /\w:\/\//.test(path) ? path : `${baseUrl}${path}`

  const res: Response = await fetch(url, {
    ...defaultOptions, ...options,
    headers: new Headers({
      ...defaultOptions.headers, ...options.headers,
    }),
  })
  if (res.status >= 400) {
    message.error(`${res.status} (${res.statusText})`)
    throw res
  }
  return res.json()
}

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

// function haveBody(method: string | undefined) {
//   method = method ? method.toUpperCase() : 'GET'
//   return method === 'POST' || method === 'PUT'
// }
