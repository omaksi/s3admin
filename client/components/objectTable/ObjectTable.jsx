// @ts-check

import React from 'react'

import { generateUpPrefix, generateObjectUrl, copyToClipboard } from './helpers'
import { computeTableData } from './computeData'

import { Table, Icon, Tooltip, Divider } from 'antd'

/**
 * @typedef {import('./types').TableRecord} Record
 */

/**
 * @typedef {object} Props
 * @prop {import('aws-sdk').S3.Types.ListObjectsV2Output | undefined} objects
 * @prop {boolean} loading
 * @prop {string} activePrefix
 * @prop {string | undefined} selectedBucket
 * @prop {string} delimiter
 * @prop {Function} onDeleteObject
 * @prop {Function} onPrefixChange
 * @prop {number} perPage
 */

/**
 * @typedef {object} State
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class ObjectTable extends React.Component {
  /**
   * @param {string} recordTitle
   */
  handlePrefixChange = (recordTitle) => () => {
    this.props.onPrefixChange(recordTitle)
  }

  /**
   * @param {string} link
   */
  handleCopyLink = (link) => () => {
    copyToClipboard(link)
  }

  render() {
    /** @type {Record[]} */
    const data = computeTableData(this.props.objects, this.props.activePrefix)

    /** @type {import('antd/lib/table').ColumnProps<Record>[]} */
    const columns = [
      {
        title: '',
        key: 'icon',
        width: 40,
        render: (text, record) => {
          if (record.isUp) {
            return <Icon style={{ marginLeft: 12 }} type="arrow-left" theme="outlined" />
          }
          if (record.isFolder) {
            return <Icon style={{ marginLeft: 12 }} type="folder" theme="outlined" />
          }
          return <Icon style={{ marginLeft: 12 }} type="file" theme="outlined" />
        },
      },
      {
        title: 'Name',
        key: 'name',
        render: (text, record) => {
          if (record.isUp) {
            return (
              <a
                onClick={this.handlePrefixChange(
                  generateUpPrefix(this.props.activePrefix, this.props.delimiter)
                )}
              >
                <b>..</b>
              </a>
            )
          }
          if (record.isFolder) {
            return (
              <a onClick={this.handlePrefixChange(record.title)}>
                <b>{record.title}</b>
              </a>
            )
          }
          return record.title
        },
      },
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        width: 160,
      },
      {
        title: 'Last Modified',
        dataIndex: 'lastModified',
        key: 'lastModified',
        width: 300,
      },
      {
        title: 'Storage Class',
        dataIndex: 'storageClass',
        key: 'storageClass',
        width: 120,
      },
      {
        title: 'Actions',
        key: 'action',
        width: 100,
        render: (_text, record) => {
          if (record.isUp) {
            return null
          }
          return (
            <span>
              {/* <Tooltip title="Delete" mouseLeaveDelay={0.05}>
              <Icon
                type="delete"
                theme="outlined"
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => onDeleteObject(record.title)}
              />
            </Tooltip> */}

              {!record.isFolder && (
                <>
                  {/* <Divider type="vertical" /> */}
                  <Tooltip title="Copy Link" mouseLeaveDelay={0.05}>
                    <Icon
                      type="copy"
                      theme="outlined"
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={this.handleCopyLink(
                        generateObjectUrl(
                          this.props.selectedBucket,
                          this.props.activePrefix,
                          record.title
                        )
                      )}
                    />
                  </Tooltip>
                  {/* <Divider type="vertical" />
                  <Tooltip title="Download" mouseLeaveDelay={0.05}>
                    <a
                      href={generateObjectUrl(
                        this.props.selectedBucket,
                        this.props.activePrefix,
                        record.title
                      )}
                      download
                    >
                      <Icon
                        type="cloud-download"
                        theme="outlined"
                        style={{
                          cursor: 'pointer',
                        }}
                      />
                    </a>
                  </Tooltip> */}
                  <Divider type="vertical" />
                  <Tooltip title="Open in New Window" mouseLeaveDelay={0.05}>
                    <a
                      href={generateObjectUrl(
                        this.props.selectedBucket,
                        this.props.activePrefix,
                        record.title
                      )}
                      target="_blank"
                    >
                      <Icon
                        type="eye"
                        theme="outlined"
                        style={{
                          cursor: 'pointer',
                        }}
                      />
                    </a>
                  </Tooltip>
                </>
              )}
            </span>
          )
        },
      },
    ]

    return (
      <Table
        loading={this.props.loading}
        size="middle"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: this.props.perPage + 1,
          hideOnSinglePage: true,
        }}
        scroll={{ y: window.innerHeight - (40 + 16 + 32 + 15 + 25 + 25) }}
      />
    )
  }
}
