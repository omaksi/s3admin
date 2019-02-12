// @ts-check

import React from 'react'

import { Input, Button } from 'antd'

/**
 * @typedef {object} Props
 * @prop {(accessKeyId: string, secretAccessKey: string) => Promise<void>} onLoginSubmit
 */

/**
 * @typedef {object} State
 * @prop {string } accessKeyId
 * @prop {string } secretAccessKey
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class Login extends React.Component {
  state = {
    accessKeyId: '',
    secretAccessKey: '',
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

  handleLoginSubmit = async () => {
    this.props.onLoginSubmit(this.state.accessKeyId, this.state.secretAccessKey)
  }

  render() {
    return (
      <div className="Login">
        <style jsx>{`
          .Login {
            width: 500px;
            margin: 0 auto;
          }
        `}</style>
        <h1>s3admin - Login</h1>
        <Input
          onChange={this.handleInputChange('accessKeyId')}
          value={this.state.accessKeyId}
          placeholder="Access Key ID"
        />
        <Input
          onChange={this.handleInputChange('secretAccessKey')}
          value={this.state.secretAccessKey}
          placeholder="Secret Access Key"
        />

        <Button type="primary" onClick={this.handleLoginSubmit}>
          Submit
        </Button>
      </div>
    )
  }
}
