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
