# Human Invaders - Web Game

Human Invaders for web is an experimental web game using Three.js.

[Press here to play the game](https://happy-rock-0df002703.4.azurestaticapps.net) (In progress)

![Game demonstration](/images/game_first_scene.gif)

## Status
![Build](https://github.com/Murillo/Human-Invaders-Web-Game/actions/workflows/build.yml/badge.svg)

## How to run
### Requirements
* [Node 24.x](https://nodejs.org/en/download) (or run `nvm install` and `nvm use`)
* [Docker](https://www.docker.com/products/docker-desktop/)

### Local
Clone this project and perform the below commands:
```
npm ci
npm start
```
It is available in any moder browser via the url `http://localhost:3000`

### Docker
Run the below command to build the docker image
```
docker build -t game/human-invaders .
```

In the sequence, run this command to start the container
```
docker run -p 80:80 game/human-invaders
```

It is available in any moder browser via the url `http://localhost`
