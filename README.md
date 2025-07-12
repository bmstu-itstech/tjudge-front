# Bauman Code Tournament Frontend

## Быстрый старт

1. **Установите зависимости:**

   ```bash
   pnpm install
   # или
   npm install
   # или
   yarn install
   ```

2. **Запустите dev-сервер:**

   ```bash
   pnpm dev
   # или
   npm run dev
   # или
   yarn dev
   ```

3. **Откройте в браузере:**

   [http://localhost:3000](http://localhost:3000)

---

## Структура проекта
- `app/` — страницы и роутинг (Next.js App Router)
- `components/` — UI и бизнес-компоненты
- `hooks/` — кастомные хуки
- `lib/` — утилиты
- `public/` — статика (иконки, изображения)
- `styles/`, `static/css/` — глобальные и кастомные стили

## Настройка
- **.env:** переменные окружения не требуются для фронта (MVP).
- **Моки:** для тестирования без бэка используются встроенные моки (см. компоненты).
- **Админка:** доступна по `/admin` (роль определяется мок-логикой).

## Технологии
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui, Radix UI

---

## Контакты
Разработка: @sgrisshk 