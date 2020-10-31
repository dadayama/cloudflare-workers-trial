addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event: FetchEvent) {
  const request = event.request

  const url = new URL(request.url)
  const cacheKey = new Request(url.toString(), request)
  const cache = caches.default

  let response = await cache.match(cacheKey)
  let body: string

  if (!response) {
    response = await fetch(new Request(request))
    switch (url.pathname) {
      case '/hoge':
        body = 'hoge'
        break
      case '/fuga':
        body = 'fuga'
        break
      default:
        body = 'piyo'
        break
    }
    response = new Response(body, response)

    event.waitUntil(cache.put(cacheKey, response.clone()))
  }

  return response
}
