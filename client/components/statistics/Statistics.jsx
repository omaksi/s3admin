// @ts-check

import React from 'react'

import { Statistic, Row, Col, Button } from 'antd'

import fetcher from '../../../utils/fetcher'

import { formatFileSize } from '../../helpers'

/**
 * @typedef {object} Props
 * @prop {string} accessKeyId
 * @prop {string} secretAccessKey
 * @prop {string | undefined} selectedBucket
 */

/**
 * @typedef {object} State
 * @prop {number} totalFiles
 * @prop {number} totalSize
 * @prop {boolean} loading
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class Statistics extends React.Component {
  state = {
    totalFiles: 0,
    totalSize: 0,
    loading: false,
  }

  handleAnalyzeSubmit = async () => {
    this.setState({
      loading: true,
    })

    /** @type {[number, number]} */
    const res = await fetcher(
      '/s3statistic',
      {
        method: 'POST',
      },
      {
        action: 'countStatistics',
        params: {
          Bucket: this.props.selectedBucket,
        },
        accessKeyId: this.props.accessKeyId,
        secretAccessKey: this.props.secretAccessKey,
      }
    )

    this.setState({
      totalFiles: res[0],
      totalSize: res[1],
      loading: false,
    })
  }

  render() {
    return (
      <div className="Statistics">
        <style jsx>{`
          .Statistics {
            width: 800px;
            margin: 0 auto;
          }
        `}</style>
        <Button type="primary" onClick={this.handleAnalyzeSubmit}>
          Analyze Bucket
        </Button>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="File count" value={this.state.totalFiles} />
          </Col>
          <Col span={12}>
            <Statistic title="Total size" value={formatFileSize(this.state.totalSize)} />
          </Col>
        </Row>
      </div>
    )
  }
}
