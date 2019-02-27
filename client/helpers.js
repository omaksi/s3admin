/**
 * Formats file size to ex. 6MB
 *
 * @param {number} size
 * @returns {string}
 */
export const formatFileSize = (size) => {
  if (!size) {
    return '0B'
  }
  const i = Math.floor(Math.log(size) / Math.log(1024))
  // @ts-ignore
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}

/**
 * Formats Date
 *
 * @param {Date | undefined} date
 * @return {string}
 */
export const formatDate = (date) => {
  return new Date(date ? date : 0).toLocaleString('en-US', {
    timeZone: 'UTC',
  })
}
