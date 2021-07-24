# BOOK COMMUNITY - WEBSITE

## INFOMATION
This is a system for storing books and stories for everyone. Combine APIs for other platforms to use.
It is programmed from Express JS - MySQL. Using Docker technology to optimize installation.

## AUTHORS
- chenjiinguyen
- NhuQuynh0711
- xuankim
- sonkoi24112
## OTHER PLATFORMS

- ANDROID: [https://github.com/chenjiinguyen/book-community-android](https://github.com/chenjiinguyen/book-community-android)
- WINDOWS DESKTOP: [https://github.com/chenjiinguyen/PTUDTM](https://github.com/chenjiinguyen/PTUDTM)

## LINK

- Website: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:3000/api](http://localhost:3000/api)
- API Document: [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)
- phpMyAdmin: [http://localhost:4000](http://localhost:4000)

## REQUIREMENT
- Docker

## SETUP
After cloning the project, you need to run the commands below for the project to work. And only need to run once after cloning.
### FOR WINDOWS
``` 
copy .env.example .env
copy mysql\BOOKCOMMUNITY.sql.example mysql\BOOKCOMMUNITY.sql
win\dos2unix.exe app\run.sh
```

### FOR MACOS/LINUX
``` 
cp .env.example .env
cp mysql/BOOKCOMMUNITY.sql.example mysql/BOOKCOMMUNITY.sql
```

## START SERVER

For the first run
```
docker compose up --build
```

From the 2nd run onwards
```
docker compose up
```