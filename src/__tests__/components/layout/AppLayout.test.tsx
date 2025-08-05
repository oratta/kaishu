import { render, screen } from '@testing-library/react';

import AppLayout from '@/components/layout/AppLayout';

describe('AppLayout', () => {
  it('should render children correctly', () => {
    const testContent = 'Test Content';
    render(
      <AppLayout>
        <div>{testContent}</div>
      </AppLayout>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('should have proper layout structure', () => {
    const { container } = render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>,
    );

    // レイアウトが適切な構造を持っていることを確認
    expect(container.querySelector('.app-layout')).toBeInTheDocument();
  });

  it('should contain header', () => {
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>,
    );

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should contain navigation', () => {
    render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('should be responsive', () => {
    const { container } = render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>,
    );

    // レスポンシブクラスが適用されていることを確認
    const layout = container.querySelector('.app-layout');
    expect(layout).toHaveClass('min-h-screen');
  });
});
