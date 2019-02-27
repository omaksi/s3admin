// @ts-check

import { formatFileSize, formatDate } from '../../helpers'

/**
 * @typedef {import('./types').TableRecord} Record
 */

/**
 * Computes table data from AWS listObjectV2
 *
 * @param {import('aws-sdk').S3.Types.ListObjectsV2Output | undefined} objects
 * @param {string} activePrefix
 *
 * @returns {Record[]}
 */
export const computeTableData = (objects, activePrefix) => {
  /** @type {Record[]}  */
  const data = []

  if (!objects) {
    return data
  }

  //   console.log('computeTableData', activePrefix)

  if (activePrefix) {
    data.push({
      title: '..',
      isFolder: false,
      isUp: true,
      key: '____@##!up',
    })
  }

  const folders = objects.CommonPrefixes
    ? objects.CommonPrefixes.map((prefix) => ({
        title: prefix.Prefix ? prefix.Prefix : '-',
        isFolder: true,
        isUp: false,
        key: prefix.Prefix ? prefix.Prefix : '-',
      }))
    : []

  data.push(...folders)

  const files = objects.Contents
    ? objects.Contents.map((key) => ({
        title: key.Key ? key.Key : '-',
        size: key.Size ? formatFileSize(key.Size) : '0',
        lastModified: formatDate(key.LastModified),
        key: key.Key ? key.Key : '-',
        isUp: false,
        isFolder: false,
        storageClass: key.StorageClass,
      }))
    : []

  data.push(...files)

  return data
}
