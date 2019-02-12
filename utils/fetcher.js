// @ts-check

/**
 *
 * @param {string} url
 * @param {object} options
 * @param {string} options.method
 * @param {object} data
 * @returns {Promise<object>}
 */
const fetcher = async (url, options, data) => {
  console.log(url, options, data)

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  console.log('fetcher fetched', json)
  return json
}

export default fetcher
