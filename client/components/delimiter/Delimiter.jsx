// @ts-check

import React from 'react'

import { Input, Button } from 'antd'

/**
 * @typedef {object} Props
 * @prop {(value: string) => void} onDelimiterSubmit
 * @prop {string} defaultValue
 */

/**
 * @typedef {object} State
 * @prop {string | undefined} delimiterInput
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class Delimiter extends React.Component {
  state = {
    delimiterInput: this.props.defaultValue,
  }

  /**
   * Generic Input change handler
   *
   * @param {string} name
   */
  handleInputChange = (name) =>
    /**
     * @param {object} e
     */
    (e) => {
      const value = e.target.value
      this.setState((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }

  handleDelimiterSubmit = () => {
    this.props.onDelimiterSubmit(this.state.delimiterInput)
  }

  render() {
    return (
      <div className="Delimiter">
        <style jsx>{`
          .Delimiter {
            margin-left: 10px;
            width: 150px;
            display: flex;
            flex-direction: row;
          }
          .Delimiter input {
            width: 30px;
          }
          .Delimiter button {
            width: 100px;
          }
        `}</style>
        <span>Delimiter:</span>
        <Input
          onChange={this.handleInputChange('delimiterInput')}
          value={this.state.delimiterInput}
          placeholder="Delimiter"
        />
        <Button onClick={this.handleDelimiterSubmit}>Set</Button>
      </div>
    )
  }
}
