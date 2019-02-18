// @ts-check

import React from 'react'

import { Spin, Icon, Checkbox } from 'antd'

import { formatFileSize } from '../../helpers'

/**
 * @typedef {object} Props
 * @prop {boolean} isLoading
 * @prop {string | undefined} selectedBucket
 * @prop {import('aws-sdk').S3.Types.GetBucketLocationOutput | undefined} bucketLocation
 * @prop {() => void} onAutoAnalyzeChange
 * @prop {boolean} autoAnalyze
 * @prop {number} totalSize
 * @prop {number} totalFiles

 */

/**
 * @typedef {object} State
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class HeaderInfo extends React.Component {
  handleAutoAnalyzeChange = () => {
    this.props.onAutoAnalyzeChange()
  }

  render() {
    return (
      <div className="Loading">
        <style jsx>{`
          .Loading {
            position: absolute;
            top: 7px;
            right: 20px;
          }
        `}</style>
        {this.props.isLoading && (
          <>
            <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
            &nbsp;&nbsp;&nbsp;Loading...&nbsp;&nbsp;&nbsp;
          </>
        )}
        <span>
          <Checkbox checked={this.props.autoAnalyze} onChange={this.handleAutoAnalyzeChange}>
            Auto-Analyze
          </Checkbox>
        </span>{' '}
        {this.props.totalFiles > 0 && (
          <span>
            Total files: <strong>{this.props.totalFiles}</strong>
          </span>
        )}{' '}
        {this.props.totalSize > 0 && (
          <span>
            Total size: <strong>{formatFileSize(this.props.totalSize)}</strong>
          </span>
        )}{' '}
        {this.props.selectedBucket && (
          <span>
            Bucket: <strong>{this.props.selectedBucket}</strong>
          </span>
        )}{' '}
        {this.props.bucketLocation && (
          <span>
            Region: <strong>{this.props.bucketLocation.LocationConstraint}</strong>
          </span>
        )}
      </div>
    )
  }
}
