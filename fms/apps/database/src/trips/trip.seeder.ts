import { Seeder } from 'typeorm-seeding';
import { Connection, ObjectType } from 'typeorm';
import { EntityFactory } from 'typeorm-seeding/dist/entity-factory';
import { Trip } from './shared/trip.entity';

export class TripSeeder implements Seeder {
  async run(factory: <Entity, Settings>(entity: ObjectType<Entity>) => (settings?: Settings) => EntityFactory<Entity, Settings>, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Trip)
      .values([
        { driver: { id: 1 }, car: { id: 1 }, date: new Date() },
        { driver: { id: 2 }, car: { id: 3 }, date: new Date() },
      ])
      .execute();
  }
}
