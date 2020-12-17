export const handleApiError = (response: Response) => {
  if (response.status === 404) {
    // TODO add 404 notification
  } else if (response.status >= 500) {
    // TODO add 500 notification
  } else if (!response || !response.status) {
    // TODO add offline notification
  }
  return Promise.reject(response)
}

export const handleHttpRequest = (
  url: string,
  options: RequestInit = {},
  errorHandler = handleApiError
) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' })
  }
  return fetch(`${url}`, options)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response)
      } else {
        return response.json()
      }
    })
    .catch(errorHandler)
}

export const getRequest = (url: string, errorHandler?: () => Promise<never>) =>
  handleHttpRequest(
    url,
    {
      method: 'GET',
    },
    errorHandler
  )

export const getImages = (
  page = 1,
  limit = 10,
  errorHandler?: () => Promise<never>
) =>
  getRequest(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`,
    errorHandler
  )
