// @ts-check

import React from 'react'

import { Input, Button, Alert } from 'antd'

/**
 * @typedef {object} Props
 * @prop {(accessKeyId: string, secretAccessKey: string) => Promise<void>} onLoginSubmit
 * @prop {string} error
 */

/**
 * @typedef {object} State
 * @prop {string} accessKeyId
 * @prop {string} secretAccessKey
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

          .small {
            font-size: smaller;
          }
        `}</style>
        <h1>s3admin - Login</h1>

        <p className="small">* Access Key Id and Secret Access Key are not permanently stored.</p>
        <Input
          onChange={this.handleInputChange('accessKeyId')}
          value={this.state.accessKeyId}
          placeholder="Access Key ID"
          autoComplete="on"
        />
        <Input
          onChange={this.handleInputChange('secretAccessKey')}
          value={this.state.secretAccessKey}
          placeholder="Secret Access Key"
          autoComplete="on"
        />

        <Button
          style={{ float: 'right', marginTop: 5 }}
          type="primary"
          onClick={this.handleLoginSubmit}
        >
          Submit
        </Button>

        {this.props.error && <Alert message={this.props.error} type="error" />}
      </div>
    )
  }
}
