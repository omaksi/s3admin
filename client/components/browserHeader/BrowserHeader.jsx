// @ts-check

import React from 'react'
/**
 * @typedef {object} Props
 * @prop {any} children
 */

/**
 * @typedef {object} State
 */

/**
 * @extends {React.Component<Props, State>}
 */
export default class BrowserHeader extends React.Component {
  render() {
    return (
      <div className="BrowserHeader">
        <style jsx>{`
          .BrowserHeader {
            display: flex;
            flex-direction: row;
            margin: 0px 0 15px;
            justify-content: space-between;
            padding: 0 20px;
            line-height: 32px;
          }
        `}</style>
        {this.props.children}
      </div>
    )
  }
}
