while ! mysql -hmysqldb -uroot -proot -e";" > /dev/null ; do
    echo "Reconnect after 2 seconds";
    sleep 2;
done
counter=$(mysql -hmysqldb -uroot -proot BOOKCOMMUNITY --raw --batch -e "SELECT COUNT(Table_name) from information_schema.tables where table_schema = 'BOOKCOMMUNITY'" -s);
echo "Check database exist";
if [[ "${counter}" > 0 ]];then
    echo "Start backup database";
    mysqldump -hmysqldb -uroot -proot BOOKCOMMUNITY > /database/BOOKCOMMUNITY_BACKUP.sql;
    cp -f /database/BOOKCOMMUNITY_BACKUP.sql /database/BOOKCOMMUNITY.sql;
    rm -f /database/BOOKCOMMUNITY_BACKUP.sql;
    echo "Finish backup database";
else
    echo "Start restore database";
    mysql -hmysqldb -uroot -proot BOOKCOMMUNITY < /database/BOOKCOMMUNITY.sql;
    echo "Finish restore database";
fi
echo "Start server";
yarn dev;