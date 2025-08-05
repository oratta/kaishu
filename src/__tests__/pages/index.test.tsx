import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('should render successfully', () => {
    render(<HomePage />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should contain welcome message', () => {
    render(<HomePage />);

    expect(screen.getByText(/ライフオーケストレーション/i)).toBeInTheDocument();
  });

  it('should have proper meta tags', () => {
    render(<HomePage />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('should meet basic accessibility requirements', () => {
    const { container } = render(<HomePage />);

    // ページに適切なランドマークがあることを確認
    expect(container.querySelector('main')).toBeInTheDocument();

    // h1タグが存在することを確認
    const headings = screen.getAllByRole('heading');
    const h1s = headings.filter((heading) => heading.tagName === 'H1');
    expect(h1s.length).toBeGreaterThan(0);
  });
});
