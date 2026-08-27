import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-5 text-center">
          <p className="font-display text-2xl">Something broke loading this page.</p>
          <a href="/" className="text-sm text-lime underline">
            Back to home
          </a>
        </div>
      )
    }
    return this.props.children
  }
}
