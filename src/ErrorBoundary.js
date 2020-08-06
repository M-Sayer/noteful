import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = {
    error: false
  }

  static getStateFromError(error) {
    return { error: true }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="group-column">
          <h2>Oops, something went wrong!</h2>
          <p>{this.props.error}</p>
        </div>
      )
    }
    return this.props.children
  }
}