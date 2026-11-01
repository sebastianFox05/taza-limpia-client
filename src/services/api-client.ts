import { API_URL, ENDPOINTS, STORAGE_KEYS } from '@/const/api'
import { CONNECTION_ERROR } from '@/const/messages'
import { readStorage } from '@/services/storage'

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  signal?: AbortSignal
}

let sessionExpiredHandler: (() => void) | null = null

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

// El contexto de sesion se apunta aqui para enterarse de un token caducado
export const setSessionExpiredHandler = (handler: (() => void) | null): void => {
  sessionExpiredHandler = handler
}

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : CONNECTION_ERROR

export const apiRequest = async <T>(path: string, { method = 'GET', body, signal }: RequestOptions = {}): Promise<T> => {
  const token = readStorage<string>(STORAGE_KEYS.TOKEN)
  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      signal,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiError(CONNECTION_ERROR, 0)
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    if (response.status === 401 && token && path !== ENDPOINTS.LOGIN) sessionExpiredHandler?.()
    throw new ApiError(data?.message ?? CONNECTION_ERROR, response.status)
  }

  return data as T
}
