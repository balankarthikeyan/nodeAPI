## CREATE Docker File

```txt
    Dockerfile format
    docker build .

    docker run <docker-Image-Name>  or <docker-Image-Id>
    Ex: sha256:b5f84eeb695365e388e01b17bd7d92bb9c218a4a3cbde6570b66289acc352c84

    DELETE
    docker stop <docker-Image-Name>  or <docker-Image-Id>
    docker rmi -f <docker-Image-Name>  or <docker-Image-Id>
    Ex:sha256:b5f84eeb695365e388e01b17bd7d92bb9c218a4a3cbde6570b66289acc352c84




    docker build . -t back-end-feb-15
    docker run -d -p 8206:8080 back-end-feb-15/ID

```
