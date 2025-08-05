import { render, screen } from '../../utils/test-utils';
import AppLayout from '@/components/layout/AppLayout';

describe('AppLayout', () => {
  it('ヘッダーが表示される', () => {
    render(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>,
    );

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('ナビゲーションが表示される', () => {
    render(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('フッターが表示される', () => {
    render(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>,
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('子要素が正しくレンダリングされる', () => {
    render(
      <AppLayout>
        <div data-testid="test-content">Test Content</div>
      </AppLayout>,
    );

    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test Content');
  });

  it('背景色が適用される', () => {
    render(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>,
    );

    const wrapper = screen.getByRole('banner').parentElement;
    expect(wrapper).toHaveClass('bg-gray-50');
  });
});
