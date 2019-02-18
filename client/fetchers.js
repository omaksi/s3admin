import fetcher from '../utils/fetcher'

export const listObjectsV2 = async (params, accessKeyId, secretAccessKey) =>
  fetcher(
    '/s3',
    {
      method: 'POST',
    },
    {
      action: 'listObjectsV2',
      params,
      accessKeyId,
      secretAccessKey,
    }
  )

export const getBucketLocation = async (params, accessKeyId, secretAccessKey) =>
  fetcher(
    '/s3',
    {
      method: 'POST',
    },
    {
      action: 'getBucketLocation',
      params,
      accessKeyId,
      secretAccessKey,
    }
  )
export const listBuckets = async (params, accessKeyId, secretAccessKey) =>
  fetcher(
    '/s3',
    {
      method: 'POST',
    },
    {
      action: 'listBuckets',
      params,
      accessKeyId,
      secretAccessKey,
    }
  )

// Bucket Stuff

export const bucketInfoActions = [
  'getBucketAcl',
  // 'getBucketAnalyticsConfiguration', // ID
  'getBucketCors', //404
  'getBucketEncryption', //404
  // 'getBucketInventoryConfiguration', // ID
  'getBucketLifecycleConfiguration', // 404
  'getBucketLogging', // Empty
  // 'getBucketMetricsConfiguration', //ID
  'getBucketNotificationConfiguration',
  'getBucketPolicy',
  'getBucketPolicyStatus',
  'getBucketReplication',
  'getBucketRequestPayment',
  'getBucketTagging',
  'getBucketVersioning',
  'getBucketWebsite',
]

export const genericS3Fetcher = async (action, params, accessKeyId, secretAccessKey) =>
  fetcher(
    '/s3',
    {
      method: 'POST',
    },
    {
      action,
      params,
      accessKeyId,
      secretAccessKey,
    }
  )
