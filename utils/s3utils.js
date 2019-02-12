// @ts-check

/**
 * Get bucket file count and total size
 *
 * @param {import('aws-sdk').S3} s3
 * @param {string} Bucket
 * @param {number} [sizeResult]
 * @param {number} [countResult]
 * @param {string | undefined} [ContinuationToken]
 * @returns {Promise<>}
 */
const getBucketCountAndSize = async (
  s3,
  Bucket,
  sizeResult = 0,
  countResult = 0,
  ContinuationToken
) => {
  try {
    const data = await s3
      .listObjectsV2({ Bucket: Bucket, ContinuationToken: ContinuationToken })
      .promise()

    if (!data || !data.Contents) {
      return [0, 0]
    }

    // Size property of each item
    sizeResult += data.Contents.reduce((acc, item) => acc + (item.Size ? item.Size : 0), 0)

    // Count of items
    countResult += data.Contents.length

    if (data.IsTruncated) {
      const results = await getBucketCountAndSize(
        s3,
        Bucket,
        sizeResult,
        countResult,
        data.NextContinuationToken
      )
      //  continuation
      return results
    }

    // last one
    return [countResult, sizeResult]
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = { getBucketCountAndSize }
