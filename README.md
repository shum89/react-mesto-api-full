# Проект Mesto REST API

 * можно удалять/добавлять карточки с фотографиями
 * лайкать/снимать лайк, счетчик лайков меняется
 * менять аватар
 * менять информацию о пользователе\
 * Регистрация
 * Авторизация
 
Настроен сервер на Express
  
## Cтэк
* Node.js
* Express
* MongoDB

## Домен
api.shumakov.students.nomoreparties.xyz/

## Публичный IP-адрес
178.154.224.135

## Запросы

### Регистрация пользователя

POST https://api.shumakov.students.nomoreparties.xyz/signup

Передать объект

```
{
  "name": "Good Boy",
  "about": "Perfect Being",
  "avatar": "https://thesmartcanine.com/wp-content/uploads/2019/01/australian-shepherd-dog-breed.jpg",
   "email": "example@exmaple.ru",
   "password": "password"
}
```
* Успешный запрос возвращает объект пользователя со статусом 200.

* Если пользователь уже существует приходит ответ со статусом 409 и ошибкой

* Если введены некорректные данные приходит ответ со статусом 400 и ошибкой валидации.

### Авторизация

POST https://api.shumakov.students.nomoreparties.xyz/signin

Передать объект

```
{
   "email": "example@exmaple.ru",
   "password": "password"
}
```

* Успешный запрос возвращает сообщение о успешной авторизации со статусом 200.

* Если введены некорректные данные приходит ответ со статусом 401 и ошибкой авторизации.


### Редактирование информации о пользователе

PATCH https://api.shumakov.students.nomoreparties.xyz/users/me

Передать объект

```
{
   "name": "Good Boy",
   "about": "Perfect being"
}
```

* Успешный запрос возвращает объект пользователя со статусом 200.

* Если введены некорректные данные приходит ответ со статусом 400 и ошибкой валидации.

### Редактирование аватара

PATCH https://api.shumakov.students.nomoreparties.xyz/users/me/avatar

Передать объект
```
{
   "name": "Good Boy",<br/>
   "about": "Perfect being"<br/>
}
```
* Успешный запрос возвращает объект пользователя со статусом 200.

* Если введены некорректные данные приходит ответ со статусом 400 и ошибкой валидации.

### Добавление карточки

POST https://api.shumakov.students.nomoreparties.xyz/cards

Передать объект
```
{
   "name": "New Card",
   "link": "https://thesmartcanine.com/wp-content/uploads/2019/01/australian-shepherd-dog-breed.jpg",
}
```
* Успешный запрос возвращает объект карточки со статусом 200.

* Если введены некорректные данные приходит ответ со статусом 400 и ошибкой валидации.

### Лайк карточки

PUT https://api.shumakov.students.nomoreparties.xyz/cards/:id/likes

* Успешный запрос возвращает объект карточки со статусом 200.

* Если карточки не существует в базе приходит ответ со статусом 404 и сообщением об ошибке
 
* Если введен некорректный id приходит ответ со статусом 400 и сообшением об ошибке валидации

### Дизлайк карточки

DELETE https://api.shumakov.students.nomoreparties.xyz/cards/:id/likes

* Успешный запрос возвращает объект карточки со статусом 200.

* Если карточки не существует в базе приходит ответ со статусом 404 и сообщением об ошибке
 
* Если введен некорректный id приходит ответ со статусом 400 и сообшением об ошибке валидации


### Удаление карточки

DELETE https://api.shumakov.students.nomoreparties.xyz/cards/:id

* Успешный запрос возвращает объект карточки со статусом 200.

* Если пользователь попытался удалить чужую карточку приходит ответ со статусом 403 и сообщением об ошибке

* Если карточки не существует в базе приходит ответ со статусом 404 и сообщением об ошибке
 
* Если введен некорректный id приходит ответ со статусом 400 и сообшением об ошибке валидации



