// @ts-check

/**
 * Generates one level up prefix
 *
 * @param {string} activePrefix
 * @param {string} delimiter
 * @return {string}
 */
export const generateUpPrefix = (activePrefix, delimiter = '/') => {
  // const activePrefix = this.props.query.path
  const newPrefix = activePrefix.split(delimiter)
  newPrefix.splice(-2, 1)
  return newPrefix.join(delimiter)
  // console.log(newPrefix.join('/'))
}

/**
 * Generates S3 Url
 *
 * @param {string | undefined} Bucket
 * @param {string} activePrefix
 * @param {string} Key
 * @return {string}
 */
export const generateObjectUrl = (Bucket, activePrefix, Key) => {
  if (!Bucket) {
    return '#'
  }
  const url = `http://${Bucket}.s3.amazonaws.com/${activePrefix}${Key}`
  // console.log(url)
  return url
}

/**
 * Creates hidden element and copies content
 *
 * @param {string} value
 * @return {void}
 */
export const copyToClipboard = (value) => {
  const el = document.createElement('textarea')
  el.value = value
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}
