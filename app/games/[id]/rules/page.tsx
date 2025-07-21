"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GameRulesPage() {
  const params = useParams()
  const gameId = params.id as string

  // Мок данных игры
  const game = {
    id: gameId,
    name: "Задача A",
    tag: "judge_a",
    description: "Решите задачу A",
    rules: `# Правила игры "Задача A"

## Общие положения

Это соревновательная задача по программированию, направленная на проверку навыков алгоритмического мышления и владения языками программирования.

## Условия участия

1. **Участники**: Команды из 1-3 человек
2. **Время**: 3 часа на решение
3. **Языки программирования**: Python, C++, Java, JavaScript

## Формат задачи

### Входные данные
Программа должна читать данные из стандартного ввода (stdin).

### Выходные данные
Программа должна выводить результат в стандартный вывод (stdout).

### Примеры

**Пример 1:**
\`\`\`
Вход:
5
1 2 3 4 5

Выход:
15
\`\`\`

**Пример 2:**
\`\`\`
Вход:
3
10 20 30

Выход:
60
\`\`\`

## Система оценивания

- **100 баллов** за правильное решение
- **0 баллов** за неправильный ответ
- **Частичные баллы** не предусмотрены

## Ограничения

- Время выполнения: не более 2 секунд
- Память: не более 256 МБ
- Размер исходного кода: не более 100 КБ

## Запрещено

- Использование внешних библиотек (кроме стандартных)
- Сетевые запросы
- Работа с файлами
- Использование системных команд

## Тестирование

Каждое решение проходит через набор тестов:
- **Примеры из условия** (открытые тесты)
- **Скрытые тесты** (закрытые тесты)

## Подача решений

1. Загрузите файл с решением (.py, .cpp, .java, .js)
2. Выберите язык программирования
3. Нажмите "Отправить решение"

## Подсчет результатов

Победителем считается команда, набравшая наибольшее количество баллов. При равенстве баллов учитывается время отправки решения.

---

*Удачи в решении задачи!* 🚀`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/games/${gameId}`}
            className="inline-flex items-center gap-2 text-blue-700 text-lg font-semibold transition-colors hover:text-blue-900 hover:bg-blue-50 px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад к игре
          </Link>
        </div>

        {/* Game Info */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-slate-600" />
            <h1 className="text-3xl font-bold text-slate-800">Правила игры</h1>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-slate-700">{game.name}</h2>
            <span className="text-sm bg-slate-200 text-slate-600 rounded px-2 py-1 font-mono">
              {game.tag}
            </span>
          </div>
        </div>

        {/* Rules Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Правила и условия</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: (() => {
                  let html = game.rules
                  
                  // Обрабатываем блоки кода
                  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4"><code>$1</code></pre>')
                  
                  // Разбиваем на строки для обработки заголовков
                  const lines = html.split('\n')
                  const processedLines = lines.map(line => {
                    // Заголовки
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-3xl font-bold text-slate-800 mt-8 mb-4">${line.substring(2)}</h1>`
                    }
                    if (line.startsWith('## ')) {
                      return `<h2 class="text-2xl font-bold text-slate-800 mt-6 mb-3">${line.substring(3)}</h2>`
                    }
                    if (line.startsWith('### ')) {
                      return `<h3 class="text-xl font-bold text-slate-800 mt-4 mb-2">${line.substring(4)}</h3>`
                    }
                    // Списки
                    if (line.match(/^- (.+)/)) {
                      return `<li class="ml-4 mb-1">${line.substring(2)}</li>`
                    }
                    if (line.match(/^(\d+)\.\s+(.+)/)) {
                      return `<li class="ml-4 mb-1">${line}</li>`
                    }
                    return line
                  })
                  
                  html = processedLines.join('\n')
                  
                  // Обрабатываем inline элементы
                  html = html
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
                    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
                    .replace(/\n/g, '<br>')
                  
                  return html
                })()
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 