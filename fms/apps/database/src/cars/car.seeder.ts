import { Seeder } from 'typeorm-seeding';
import { Connection, ObjectType } from 'typeorm';
import { EntityFactory } from 'typeorm-seeding/dist/entity-factory';
import { Car } from './shared/car.entity';

export class CarSeeder implements Seeder {
  async run(factory: <Entity, Settings>(entity: ObjectType<Entity>) => (settings?: Settings) => EntityFactory<Entity, Settings>, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Car)
      .values([
        { brand: 'Toyota', model: 'Hilux', plateNumber: 'AAA333', vin: 'agc345' },
        { brand: 'Toyota', model: 'Celica', plateNumber: 'CCC333', vin: 'zz230' },
        { brand: 'Honda', model: 'Civic', plateNumber: 'BBB333', vin: 'ep3asd' },
      ])
      .execute();
  }
}
