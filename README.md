# BOOK COMMUNITY - WEBSITE

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