# Infinite scroll

![GitHub last commit](https://img.shields.io/github/last-commit/RYBASPB/infinite-scroll?style=for-the-badge)


## Демо

https://gopy.tech
## Использованные технологии

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MobX](https://img.shields.io/badge/mobx-%23FF9955?style=for-the-badge&logo=mobx&logoColor=white)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![VKUI](https://img.shields.io/badge/-vkui-%230077FF?style=for-the-badge&logo=vk)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## API

[NPM REGISTRY-API](https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md)

`GET https://registry.npmjs.com/-/v1/search/-/v1/search`

> | Name        | Value   | Kind      | Required? | Notes                                                           |
> | ----------- | ------- | --------- | --------- | --------------------------------------------------------------- |
> | text        | String  | **Query** | ❌        | full-text search to apply                                       |
> | size        | integer | **Query** | ❌        | how many results should be returned (default 20, max 250)       |
> | from        | integer | **Query** | ❌        | offset to return results from                                   |
> | quality     | float   | **Query** | ❌        | how much of an effect should quality have on search results     |
> | popularity  | float   | **Query** | ❌        | how much of an effect should popularity have on search results  |
> | maintenance | float   | **Query** | ❌        | how much of an effect should maintenance have on search results |

## Функционал

- [x] Запросы через fetch
- [x] Хранение полученных данных в Mobx, подключённом к компонентам через ContextApi
- [x] Инициация подгрузки данных за счет Intersection Observer
- [x] Редактирование элемента на отдельной странице
- [x] Удаление элемента
- [x] Индикация подгрузки данных
- [ ] Unit тестирование функциональности

Дополнительно

- [x] Абсолютные пути
- [x] Prettier с конфигом VK

## UI библиотека

![VKUI](https://img.shields.io/badge/-vkui-%230077FF?style=for-the-badge&logo=vk)

- Адаптивная, мультиплатформенная, хорошо документированная
- Большой выбор качественных компонентов
- Огромный функционал "из коробки"
- Разработана и используется в ВК, активно развивается

## Зависимости

- Node v22.11.0 (lts)
- pnpm@9.12.3

## Для запуска в режиме разработки

```shell
git clone https://github.com/RYBASPB/infinite-scroll.git
```

Запускается на 3000 порту.

```shell
pnpm install
pnpm run dev
```

Можно использовать docker compose

```shell
docker-compose -f docker-compose-dev.yml up --build
```
