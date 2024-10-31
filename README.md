## portfolio 
![alt text](/dumpimgs/image.png)
### local development commands 
```
npm install
npm run start
```


### command to build docker image 

```
docker build -t myportfolio .
```


### Command to run inside Docker container

```
docker run -p 8500:8500 --name myportfolio -v /home/yash/code/yashbhangale.github.io:/app myportfolio
```


