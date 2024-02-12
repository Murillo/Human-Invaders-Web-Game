# Human Invaders - Web Game

Human Invaders for web is an experimental web game using Three.js.

[Press here to play the game](https://happy-rock-0df002703.4.azurestaticapps.net) (In progress)

## Status
![Build](https://github.com/Murillo/Human-Invaders-Web-Game/actions/workflows/build.yml/badge.svg)

## How to run
### Requirements
* [Node 18.x](https://nodejs.org/en/download)
* [Docker](https://www.docker.com/products/docker-desktop/)

### Local
Clone this project and perform the below commands:
```
npm i
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