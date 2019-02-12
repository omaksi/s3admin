import React from 'react'

import { Menu } from 'antd'

/**
 * @typedef {object} Props
 * @prop {(value: string) => Promise<void>} onChange
 * @prop {import('aws-sdk').S3.Types.Buckets | undefined} buckets
 */

/**
 * @param {Props} props
 */
const BucketSelect = (props) => {
  const { buckets, onChange } = props

  if (!buckets) {
    return null
  }

  return (
    <Menu
      onClick={(clickParams) => {
        console.log(clickParams)

        props.onChange(clickParams.key)
      }}
      style={{ width: 200, height: '100%' }}
      defaultSelectedKeys={[]}
      mode="inline"
    >
      {buckets.map((bucket) => (
        <Menu.Item key={bucket.Name}>{bucket.Name}</Menu.Item>
      ))}
    </Menu>
  )
}

export default BucketSelect
