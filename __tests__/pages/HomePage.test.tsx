import { render, screen } from '../utils/test-utils'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('メインタイトルが表示される', () => {
    render(<HomePage />)
    
    const heading = screen.getByRole('heading', { 
      name: /ライフオーケストレーション/i,
      level: 1 
    })
    expect(heading).toBeInTheDocument()
  })

  it('プライマリカラーが適用される', () => {
    render(<HomePage />)
    
    const heading = screen.getByRole('heading', { 
      name: /ライフオーケストレーション/i 
    })
    expect(heading).toHaveClass('text-primary-600')
  })

  it('中央配置レイアウトが適用される', () => {
    render(<HomePage />)
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('flex', 'min-h-screen', 'flex-col', 'items-center', 'justify-center')
  })
})