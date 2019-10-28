import { Seeder } from 'typeorm-seeding';
import { Connection, ObjectType } from 'typeorm';
import { EntityFactory } from 'typeorm-seeding/dist/entity-factory';
import { Driver } from '../shared/driver.entity';

export class DriverSeeder implements Seeder {
  async run(factory: <Entity, Settings>(entity: ObjectType<Entity>) => (settings?: Settings) => EntityFactory<Entity, Settings>, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Driver)
      .values([
        { name: 'Nikolas Pafitis', phone: '99128391', address: 'rafael 9' },
        { name: 'Kostis Kosti', phone: '99123123', address: 'griva digeni 10' },
        { name: 'Giannis Gianni', phone: '99123456', address: 'griva digeni 11' },
      ])
      .execute();
  }
}
