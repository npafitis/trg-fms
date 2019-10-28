import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1572207514437 implements MigrationInterface {
    name = 'Migration1572207514437'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `car` (`id` int NOT NULL AUTO_INCREMENT, `brand` varchar(255) NOT NULL, `model` varchar(255) NOT NULL, `plateNumber` varchar(255) NOT NULL, `vin` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `driver` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `trip` (`id` int NOT NULL AUTO_INCREMENT, `date` datetime NOT NULL, `driverId` int NULL, `carId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `trip` ADD CONSTRAINT `FK_2034f2f2e58179b42c4866f6f13` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `trip` ADD CONSTRAINT `FK_7794de982c19fe8f4cf4460efc6` FOREIGN KEY (`carId`) REFERENCES `car`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `trip` DROP FOREIGN KEY `FK_7794de982c19fe8f4cf4460efc6`", undefined);
        await queryRunner.query("ALTER TABLE `trip` DROP FOREIGN KEY `FK_2034f2f2e58179b42c4866f6f13`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `trip`", undefined);
        await queryRunner.query("DROP TABLE `driver`", undefined);
        await queryRunner.query("DROP TABLE `car`", undefined);
    }

}
