import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class RouterErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Only catch Router context errors
    if (error.message.includes('useNavigate() may be used only in the context of a <Router> component')) {
      return { hasError: true, error };
    }
    // Let other errors bubble up
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log Router context errors
    if (error.message.includes('useNavigate() may be used only in the context of a <Router> component')) {
      console.warn('Router context error caught and handled:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Return null or a loading state instead of showing error
      return null;
    }

    return this.props.children;
  }
}

export default RouterErrorBoundary;