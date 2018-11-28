# DC Courier Monitor Service Dashboard
[![Build Status](https://travis-ci.com/TeamD2018/courier-monitoring-frontend.svg?branch=master)](https://travis-ci.com/TeamD2018/courier-monitoring-frontend)

<p align="center">
  <br>
  <img alt="Logo" src="https://raw.githubusercontent.com/TeamD2018/courier-monitoring-frontend/master/screenshot.png" />
  <br><br><br>
</p>

Микросервис, позволяющий отслеживать геолокацию курьеров в рамках приложения Delivery Club.

Разработка сервиса осуществлялась в рамках итогого задания образовательного проекта Технопарк от компании Mail.Ru.

## [Установка стэка в Docker](https://github.com/TeamD2018/geo-rest)
## [Установка стэка в Kubernetes](https://github.com/TeamD2018/geo-rest-stuff/tree/master/deploy)
## Сборка файлов для раздачи веб-сервером

### Требования
* [node.js](https://nodejs.org) >= 9.10.0
* [yarn](https://yarnpkg.com/en/docs/install)

### Задаем параметры
Необходимо задать путь API и ключ для доступа к [Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key).
```
export API_KEY=kpBuvllhkTncTUvvP8fZFbQ5HK833tHMUW3uvOF
export API_URL=https://api.example.com/
```
API_URL должен заканчиваться на "/".

Также эти параметры можно задать в файле ".env".

### Собираем
```
yarn build
```
Файлы для раздачи веб-сервером появятся в папке dist.

## Команда

* [Данила Масленников](https://github.com/Dnnd)
* [Даниил Котельников](https://github.com/zwirec)
* [Олег Уткин](https://github.com/oleggator)

