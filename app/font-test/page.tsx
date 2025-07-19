export default function FontTestPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Тест шрифта ALS Sector</h1>
        
        <div className="space-y-8">
          {/* Regular weight */}
          <section className="border rounded-lg p-6">
            <h2 className="text-2xl font-normal text-slate-700 mb-4">Regular (400) - Обычное начертание</h2>
            <div className="space-y-2 text-lg">
              <p>Обычный текст: Hello World! Привет мир!</p>
              <p>С подчеркиванием: <span className="underline">Hello World! Привет мир!</span></p>
              <p>С подчеркиванием и символом: <span className="underline">Hello_World! Привет_мир!</span></p>
              <p>Только символ подчеркивания: <span className="text-2xl">_</span></p>
            </div>
          </section>

          {/* Bold weight */}
          <section className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Bold (700) - Полужирное начертание</h2>
            <div className="space-y-2 text-lg">
              <p className="font-bold">Полужирный текст: Hello World! Привет мир!</p>
              <p className="font-bold">С подчеркиванием: <span className="underline underline-fix">Hello World! Привет мир!</span></p>
              <p className="font-bold">С подчеркиванием и символом: <span className="underline underline-fix">Hello_World! Привет_мир!</span></p>
              <p className="font-bold">Только символ подчеркивания: <span className="text-2xl">_</span></p>
            </div>
          </section>

          {/* Links test */}
          <section className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Тест ссылок</h2>
            <div className="space-y-2 text-lg">
              <p>Обычная ссылка: <a href="#" className="text-blue-600 hover:underline">Ссылка с подчеркиванием</a></p>
              <p>Полужирная ссылка: <a href="#" className="text-blue-600 font-bold hover:underline underline-fix">Полужирная ссылка</a></p>
              <p>Ссылка с символом: <a href="#" className="text-blue-600 hover:underline">Ссылка_с_подчеркиванием</a></p>
            </div>
          </section>

          {/* Buttons test */}
          <section className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Тест кнопок</h2>
            <div className="space-y-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Обычная кнопка
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold">
                Полужирная кнопка
              </button>
              <button className="text-blue-600 hover:underline underline-fix">
                Кнопка-ссылка с подчеркиванием
              </button>
            </div>
          </section>

          {/* Code test */}
          <section className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Тест кода</h2>
            <div className="space-y-2">
              <p className="font-mono text-sm">Код с подчеркиванием: variable_name = "value"</p>
              <p className="font-mono text-sm font-bold">Полужирный код: variable_name = "value"</p>
              <p className="font-mono text-sm">Только символ: _</p>
            </div>
          </section>

          {/* All characters test */}
          <section className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Тест всех символов</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-normal text-lg mb-2">Regular:</h3>
                <p className="text-sm">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="text-sm">abcdefghijklmnopqrstuvwxyz</p>
                <p className="text-sm">0123456789</p>
                <p className="text-sm">!@#$%^&*()_+-=[]{}|;':",./&lt;&gt;?</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Bold:</h3>
                <p className="text-sm font-bold">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="text-sm font-bold">abcdefghijklmnopqrstuvwxyz</p>
                <p className="text-sm font-bold">0123456789</p>
                <p className="text-sm font-bold">!@#$%^&*()_+-=[]{}|;':",./&lt;&gt;?</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 