// @ts-check

import React from 'react'

import { Statistic, Row, Col, Button } from 'antd'

import ObjectList from '../objectTable/ObjectList'
// import fetcher from '../../../utils/fetcher'

import { formatFileSize } from '../../helpers'

/**
 * @typedef {object} Props
 * @prop {() => void} onAnalyzeSubmit
 * @prop {number} totalFiles
 * @prop {number} totalSize
 * @prop {import('aws-sdk').S3.ObjectList} largest
 * @prop {import('aws-sdk').S3.ObjectList} smallest
 * @prop {boolean} autoAnalyze
 */

/**
 * @typedef {object} State
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

  render() {
    return (
      <div className="Statistics">
        <style jsx>{`
          .Statistics {
            width: 800px;
            margin: 0 auto;
          }
        `}</style>
        {!this.props.autoAnalyze && (
          <Button type="primary" onClick={this.props.onAnalyzeSubmit}>
            Analyze Bucket
          </Button>
        )}
        <Row gutter={16} justify="center">
          <Col span={12}>
            <Statistic title="File count" value={this.props.totalFiles} />
          </Col>
          <Col span={12}>
            <Statistic title="Total size" value={formatFileSize(this.props.totalSize)} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Largest file"
              value={formatFileSize(this.props.largest[0].Size ? this.props.largest[0].Size : 0)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Smallest file"
              value={formatFileSize(this.props.smallest[0].Size ? this.props.smallest[0].Size : 0)}
            />
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <h4>100 Largest files</h4>
        <ObjectList objects={this.props.largest} />
        <br />
        <br />
        <br />

        <h4>100 Smallest files</h4>
        <ObjectList objects={this.props.smallest} />
      </div>
    )
  }
}
