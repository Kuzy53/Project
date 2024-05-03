```
Создание миграций
Для создания миграций вам потребуется инструмент Sequelize CLI. Установите его, запустив команду npm install --save-dev sequelize-cli.
Затем инициализируйте Sequelize CLI, запустив команду npx sequelize-cli init. Это создаст несколько новых папок: config, migrations, models и seeders.
В папке config отредактируйте файл config.json, чтобы он соответствовал вашим настройкам базы данных.
Теперь вы можете создать миграции, запустив команды npx sequelize-cli migration:generate --name create-users и npx sequelize-cli migration:generate --name create-applications. Это создаст два новых файла миграции в папке migrations.
Откройте эти файлы и добавьте код для создания таблиц users и applications с соответствующими полями.
После того, как миграции будут готовы, вы можете применить их, запустив команду npx sequelize-cli db:migrate.
Это завершает второй этап. Если у вас возникнут вопросы, не стесняйтесь задавать их. Удачи вам! 😊
```