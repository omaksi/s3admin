// @ts-check

import React from 'react'

import { Table, Icon } from 'antd'

import { formatFileSize, formatDate } from '../../helpers'

/**
 * @typedef {object} Props
 * @prop {import('aws-sdk').S3.Types.ObjectList} objects
 */

/**
 * @typedef {object} State
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class ObjectList extends React.Component {
  render() {
    /** @type {import('antd/lib/table').ColumnProps<import('aws-sdk').S3.Types.Object>[]} */
    const columns = [
      {
        title: '',
        key: 'icon',
        width: 40,
        render: () => {
          return <Icon style={{ marginLeft: 12 }} type="file" theme="outlined" />
        },
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'Key',
      },
      {
        title: 'Size',
        render: (text, record) => {
          return formatFileSize(record.Size ? record.Size : 0)
        },
        key: 'size',
        width: 160,
      },
      {
        title: 'Last Modified',
        dataIndex: 'LastModified',
        key: 'lastModified',
        render: (text, record) => {
          return formatDate(record.LastModified)
        },
        width: 300,
      },
      {
        title: 'Storage Class',
        dataIndex: 'StorageClass',
        key: 'storageClass',
        width: 120,
      },
    ]

    return (
      <Table
        size="middle"
        columns={columns}
        dataSource={this.props.objects}
        pagination={{
          pageSize: this.props.objects.length + 1,
          hideOnSinglePage: true,
        }}
        rowKey="Key"
        scroll={{ y: 300 }}
      />
    )
  }
}
