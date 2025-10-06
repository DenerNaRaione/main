# AGENTS.md — правила для агента
## Среда
- Python 3.12, Linux, KRAT (+7)
- Без внешних сетевых вызовов в тестах (моки)

## Установка
- pip install -r requirements.txt

## Тесты и качество
- pytest -q
- ruff check .
- ruff format
- mypy src/ --strict

## Контекст
- Будут парсеры XLSX/CSV, интеграция с S3/Telegram, но в песочнице — без реальных ключей.

## Инварианты
- Не ломать публичные имена функций.
- Совместимость c Python 3.12.
