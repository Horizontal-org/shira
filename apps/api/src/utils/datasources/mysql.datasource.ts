import { DataSource } from "typeorm"
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
 
config();
 
const configService = new ConfigService();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: configService.get('MYSQL_HOST'),
    port: 3306,
    username: configService.get('MYSQL_USER'),
    password: configService.get('MYSQL_PASSWORD'),
    database: configService.get('MYSQL_DATABASE'),
    migrationsTableName: 'migrations',
    migrations: ['src/migrations/*.ts'],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })