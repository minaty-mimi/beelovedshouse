import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders the main application', () => {
    render(<App />)
    expect(document.body).toBeInTheDocument()
  })

  it('displays the header with navigation', () => {
    render(<App />)
    // Check if header elements are present
    expect(screen.getByText(/Beelovedshouse/i)).toBeInTheDocument()
  })
})