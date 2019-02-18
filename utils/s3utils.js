// @ts-check

/**
 * Get bucket file count and total size
 *
 * @param {import('aws-sdk').S3} s3
 * @param {string} Bucket
 * @param {number} [sizeResult]
 * @param {number} [countResult]
 * @param {import('aws-sdk').S3.ObjectList } [largest]
 * @param {import('aws-sdk').S3.ObjectList } [smallest]
 * @param {string | undefined} [ContinuationToken]
 * @returns {Promise<>}
 */
const getBucketCountAndSize = async (
  s3,
  Bucket,
  sizeResult = 0,
  countResult = 0,
  largest = [],
  smallest = [],
  ContinuationToken
) => {
  try {
    /**
     * @type {import('aws-sdk').S3.ListObjectsV2Output}
     */
    const data = await s3
      .listObjectsV2({ Bucket: Bucket, ContinuationToken: ContinuationToken })
      .promise()

    if (!data || !data.Contents) {
      return [0, 0, [], []]
    }

    // console.log(largest)

    largest = largest.concat(data.Contents, smallest).sort(sortBySize)

    // console.log(largest)

    smallest = largest.slice(0, 100)
    largest = largest.slice(-100).reverse()

    // Size property of each item
    sizeResult += data.Contents.reduce((acc, item) => {
      // Accumulate total Size
      return acc + (item.Size ? item.Size : 0)
    }, 0)

    // Count of items
    countResult += data.Contents.length

    if (data.IsTruncated) {
      const results = await getBucketCountAndSize(
        s3,
        Bucket,
        sizeResult,
        countResult,
        largest,
        smallest,
        data.NextContinuationToken
      )
      //  continuation
      return results
    }

    // last one
    return [countResult, sizeResult, largest, smallest]
  } catch (err) {
    console.error(err)
    throw err
  }
}

/**
 * Get bucket file count and total size
 *
 * @param {import('aws-sdk').S3.Object} a
 * @param {import('aws-sdk').S3.Object} b
 * @returns {number}
 */

const sortBySize = (a, b) => {
  if (!a || !b || !a.Size || !b.Size) return 0
  if (a.Size < b.Size) return -1
  if (a.Size > b.Size) return 1
  return 0
}

module.exports = { getBucketCountAndSize }
