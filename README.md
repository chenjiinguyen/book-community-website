# BOOK COMMUNITY - WEBSITE

## LINK

- Website: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:3000/api](http://localhost:3000/api)
- API Document: [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)
- phpMyAdmin: [http://localhost:4000](http://localhost:4000)

## REQUIREMENT
- Docker

## SETUP

### FOR WINDOWS
- Run command in folder
``` 
copy .env.example .env
copy app\.env.example app\.env
sed -i 's/\r//' bot.sh
```

### FOR MACOS/LINUX
- Run command in folder
``` 
cp .env.example .env
cp app/.env.example app/.env
```

## START SERVER
```
docker-compose up --build
```