// @ts-check

import React from 'react'

import { Input, Button } from 'antd'

/**
 * @typedef {object} Props
 * @prop {(value: string) => Promise<void>} onSearchSubmit
 * @prop {string} activePrefix
 */

/**
 * @typedef {object} State
 * @prop {string | undefined} searchInput
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class Search extends React.Component {
  state = {
    searchInput: this.props.activePrefix,
  }

  /**
   * @param {Props} prevProps
   * @param {State} prevState
   */
  componentDidUpdate = (prevProps, prevState) => {
    console.log('componentDidUpdate', prevProps.activePrefix)
    if (prevProps.activePrefix !== this.props.activePrefix) {
      this.setState({
        searchInput: this.props.activePrefix,
      })
    }
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
      this.setState({
        searchInput: value,
      })
    }

  handleSearchSubmit = () => {
    this.props.onSearchSubmit(this.state.searchInput)
  }
  handleSearchClear = () => {
    this.props.onSearchSubmit(this.props.activePrefix)
    this.setState({
      searchInput: this.props.activePrefix,
    })
  }

  render() {
    return (
      <div className="Search">
        <style jsx>{`
          .Search {
            width: 500px;
            display: flex;
            flex-direction: row;
          }
          .Search input {
            width: 300px;
          }
          .Search button {
            width: 100px;
          }
        `}</style>
        <Input
          onChange={this.handleInputChange('searchInput')}
          value={this.state.searchInput}
          placeholder="Search by prefix"
          allowClear
        />

        <Button type="primary" onClick={this.handleSearchSubmit}>
          Search
        </Button>
        {/* <Button onClick={this.handleSearchClear}>Reset</Button> */}
      </div>
    )
  }
}
