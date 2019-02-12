// @ts-check

import React from 'react'

import { Select, Button } from 'antd'

// import { formatFileSize } from '../../helpers'
/**
 * @typedef {object} Props
 * prop {(value: string) => Promise<void>} onPerPageChange
 * @prop {() => Promise<void>} onLoadNext
 * @prop {number} perPage
 * @prop {string} activePrefix
 * @prop {boolean} isTruncated
 * @prop {number} totalSize
 * @prop {number} totalFiles

 */

/**
 * @typedef {object} State
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class Navigation extends React.Component {
  // /**
  //  * @param {string} value
  //  */
  // handlePerPageChange = (value) => {
  //   this.props.onPerPageChange(value)
  // }
  handleLoadNext = () => {
    this.props.onLoadNext()
  }

  render() {
    return (
      <div className="Navigation">
        <style jsx>{`
          .Navigation {
            margin-left: 10px;

            display: flex;
            flex-direction: row;
          }
        `}</style>
        {/* <span>Current path: {this.props.activePrefix ? this.props.activePrefix : 'root'}</span> */}
        {/* <Button type="primary" disabled={!this.props.isTruncated} onClick={this.handleLoadNext}>
          |&lt;-
        </Button> */}
        {/* <Select
          defaultValue={`${this.props.perPage}`}
          style={{ width: 80 }}
          onChange={this.handlePerPageChange}
        >
          <Select.Option value="100">100</Select.Option>
          <Select.Option value="200">200</Select.Option>
          <Select.Option value="500">500</Select.Option>
          <Select.Option value="1000">1000</Select.Option>
        </Select> */}
        <span>Page 1/{Math.ceil(this.props.totalFiles / this.props.perPage)}</span>
        &nbsp;
        <Button type="primary" disabled={!this.props.isTruncated} onClick={this.handleLoadNext}>
          -&gt;
        </Button>
        {/* {this.props.totalFiles > 0 && <span>Total files: {this.props.totalFiles}</span>}
        {this.props.totalSize > 0 && (
          <span>Total size: {formatFileSize(this.props.totalSize)}</span>
        )} */}
      </div>
    )
  }
}
