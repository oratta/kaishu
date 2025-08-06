import { metadata } from './metadata';

export { metadata };

export default function DesignSystemPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8">KAISHU デザインシステム</h1>

      {/* Colors */}
      <section className="mb-12">
        <h2 className="mb-6">カラーパレット</h2>

        <div className="space-y-8">
          {/* Primary Colors */}
          <div data-testid="color-primary">
            <h3 className="mb-4">プライマリカラー</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    data-testid={shade === 500 ? 'color-primary-default' : undefined}
                    className={`h-16 rounded bg-primary-${shade} ${
                      shade >= 500 ? 'text-white' : 'text-gray-900'
                    } flex items-center justify-center text-xs font-medium`}
                  >
                    {shade}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Colors */}
          <div data-testid="color-secondary">
            <h3 className="mb-4">セカンダリカラー</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    data-testid={shade === 500 ? 'color-secondary-default' : undefined}
                    className={`h-16 rounded bg-secondary-${shade} ${
                      shade >= 800 ? 'text-white' : 'text-gray-900'
                    } flex items-center justify-center text-xs font-medium`}
                  >
                    {shade}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accent Colors */}
          <div data-testid="color-accent">
            <h3 className="mb-4">アクセントカラー</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    data-testid={shade === 500 ? 'color-accent-default' : undefined}
                    className={`h-16 rounded bg-accent-${shade} ${
                      shade >= 400 ? 'text-white' : 'text-gray-900'
                    } flex items-center justify-center text-xs font-medium`}
                  >
                    {shade}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <h3 className="mb-4">セマンティックカラー</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card bg-success text-white">
                <p className="font-medium">Success</p>
                <p className="text-sm opacity-90">#10B981</p>
              </div>
              <div className="card bg-warning text-white">
                <p className="font-medium">Warning</p>
                <p className="text-sm opacity-90">#F59E0B</p>
              </div>
              <div className="card bg-error text-white">
                <p className="font-medium">Error</p>
                <p className="text-sm opacity-90">#EF4444</p>
              </div>
              <div className="card bg-info text-white">
                <p className="font-medium">Info</p>
                <p className="text-sm opacity-90">#3B82F6</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12" data-testid="typography-section">
        <h2 className="mb-6">タイポグラフィ</h2>

        <div className="space-y-6">
          <div className="card">
            <h1 className="mb-2">見出し1 - Heading 1</h1>
            <h2 className="mb-2">見出し2 - Heading 2</h2>
            <h3 className="mb-2">見出し3 - Heading 3</h3>
            <h4 className="mb-2">見出し4 - Heading 4</h4>
            <h5 className="mb-2">見出し5 - Heading 5</h5>
            <h6 className="mb-2">見出し6 - Heading 6</h6>
          </div>

          <div className="card">
            <p className="text-5xl mb-2">Display Text (5xl)</p>
            <p className="text-4xl mb-2">Display Text (4xl)</p>
            <p className="text-3xl mb-2">Display Text (3xl)</p>
            <p className="text-2xl mb-2">Display Text (2xl)</p>
            <p className="text-xl mb-2">Display Text (xl)</p>
            <p className="text-lg mb-2">Large Text (lg)</p>
            <p className="text-base mb-2">Base Text (base)</p>
            <p className="text-sm mb-2">Small Text (sm)</p>
            <p className="text-xs">Extra Small Text (xs)</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="mb-6">ボタン</h2>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">プライマリボタン</button>
            <button className="btn-secondary">セカンダリボタン</button>
            <button className="btn-accent">アクセントボタン</button>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="btn-primary" disabled>
              無効化ボタン
            </button>
            <button className="btn-secondary" disabled>
              無効化ボタン
            </button>
            <button className="btn-accent" disabled>
              無効化ボタン
            </button>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="mb-12" data-testid="form-section">
        <h2 className="mb-6">フォーム要素</h2>

        <div className="max-w-md space-y-4">
          <div>
            <label htmlFor="input-text" className="block text-sm font-medium mb-2">
              テキスト入力
            </label>
            <input
              type="text"
              id="input-text"
              className="input"
              placeholder="テキストを入力してください"
            />
          </div>

          <div>
            <label htmlFor="textarea" className="block text-sm font-medium mb-2">
              テキストエリア
            </label>
            <textarea
              id="textarea"
              className="input"
              rows={4}
              placeholder="複数行のテキストを入力してください"
            />
          </div>

          <div>
            <label htmlFor="select" className="block text-sm font-medium mb-2">
              セレクトボックス
            </label>
            <select id="select" className="input">
              <option>オプション1</option>
              <option>オプション2</option>
              <option>オプション3</option>
            </select>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mb-12">
        <h2 className="mb-6">カード</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="mb-2">カードタイトル</h3>
            <p className="text-gray-600">
              これはカードのサンプルです。ホバー時にシャドウが変化します。
            </p>
          </div>

          <div className="card bg-primary text-white">
            <h3 className="mb-2">プライマリカード</h3>
            <p className="opacity-90">プライマリカラーを背景にしたカードです。</p>
          </div>

          <div className="card bg-secondary">
            <h3 className="mb-2">セカンダリカード</h3>
            <p className="text-gray-700">セカンダリカラーを背景にしたカードです。</p>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="mb-12" data-testid="spacing-section">
        <h2 className="mb-6">スペーシング</h2>

        <div className="space-y-2">
          {[1, 2, 4, 8, 16, 32].map((space) => (
            <div key={space} className="flex items-center gap-4">
              <span className="text-sm font-mono w-12">{space}</span>
              <div className={`bg-primary h-4 w-${space}`} />
              <span className="text-sm text-gray-600">{space * 0.25}rem</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section className="mb-12" data-testid="shadow-section">
        <h2 className="mb-6">シャドウ</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <p className="font-medium mb-2">shadow-sm</p>
            <p className="text-sm text-gray-600">微細なシャドウ</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="font-medium mb-2">shadow (default)</p>
            <p className="text-sm text-gray-600">標準的なシャドウ</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="font-medium mb-2">shadow-md</p>
            <p className="text-sm text-gray-600">中程度のシャドウ</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="font-medium mb-2">shadow-lg</p>
            <p className="text-sm text-gray-600">大きめのシャドウ</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-xl">
            <p className="font-medium mb-2">shadow-xl</p>
            <p className="text-sm text-gray-600">特大シャドウ</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-soft">
            <p className="font-medium mb-2">shadow-soft</p>
            <p className="text-sm text-gray-600">ソフトなシャドウ</p>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section className="mb-12">
        <h2 className="mb-6">アニメーション</h2>

        <div className="space-y-4">
          <div className="card animate-fade-in">
            <p>フェードインアニメーション</p>
          </div>

          <div className="card animate-slide-up">
            <p>スライドアップアニメーション</p>
          </div>
        </div>
      </section>
    </div>
  );
}
