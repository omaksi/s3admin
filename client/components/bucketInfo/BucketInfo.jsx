// @ts-check

import React from 'react'

import { Button } from 'antd'

/**
 * @typedef {object} Props
 */

/**
 * @typedef {object} State
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class BucketInfo extends React.Component {
  state = {
    delimiterInput: this.props.defaultValue,
  }

  handleGetInfo = () => {}

  render() {
    return (
      <div className="BucketInfo">
        <style jsx>{`
          .BucketInfo {
            margin-left: 10px;
            width: 150px;
            display: flex;
            flex-direction: row;
          }
          .BucketInfo input {
            width: 30px;
          }
          .BucketInfo button {
            width: 100px;
          }
        `}</style>
        <span>BucketInfo:</span>

        <Button type="primary" onClick={this.handleGetInfo}>
          Get Info
        </Button>
      </div>
    )
  }
}
