# bottl

## Description

You are in a desert island and the only way to communicate is through bottles, so you better get to it.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and sign up
- **sign up** - As a user I want to sign up on the webpage so that I can see the bottles I can write or respond too
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **message types** - As a user I want to choose if I want to respond to an existing bottle or create a new one
- **message create** - As a user I want to create a message so that other people can respond 
- **message respond** - As a user I want to respond to messages from other people 

## Backlog

List of other features outside of the MVPs scope

User profile:
- see my profile
- see my current stories

Communication
- Send email notifications when a user is responded

Messages
- Send additional bottles

## ROUTES:

|Method|URL|Description|
|------|---|-----------|
|GET|/|Renders the Login page|
|GET|/auth/login|redirects to / if user logged in, renders the login form (with flash msg)|
|POST|/auth/login|redirects to / if user logged in. ```
```
body:
    - username
    - email
```


| | | |
|------|---|-----------|
|GET|/auth/singup|redirects to / if user logged in, renders the sing up form (with flash msg)|
|POST|/auth/singup|redirects to / if user logged in.| body:
    - username
    - email
    - password

| | | |
|------|---|-----------|
|POST|/auth/logout|(empty)|

| | | |
|------|---|-----------|
|GET|/bottles|renders the main page to decide what to do next (answer bottle/create new one)

| | | |
|------|---|-----------|
|GET|/bottles/new|renders page to write new message

| | | |
|------|---|-----------|
|POST|/bottles/new|redirects to /bottles
```
body:
    - sender ID
    - timestamp
    - content
    - thread
```
| | | |
|------|---|-----------|
|GET|/bottles/:id/answer|renders page to respond to existing messages

| | | |
|------|---|-----------|
|POST|/bottles/:id/answer|redirects to /bottles
```
body: 
    - sender ID
    - timestamp
    - content
    - thread
```

## Models

User model
 
```
username: String
password: String
email: String
```

Message model

```
sender: ObjectId<User>
receiver : ObjectId<User>
content: String
thread: ObjectId
creation-date: Date
``` 

## Links

### Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/rdnd0/bottl)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)


