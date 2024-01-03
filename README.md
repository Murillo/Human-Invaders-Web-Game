# Human Invaders for web

Human Invaders for web is an experimental web game using Three.js.

## How to run
Run the below command to build the docker image
```
docker build -t human-invaders .
```

In the sequence, run this command to start the container
```
docker run -p 80:80 human-invaders
```

Access in any moder browser the url `http://localhost`