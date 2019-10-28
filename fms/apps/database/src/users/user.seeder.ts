import { Seeder } from 'typeorm-seeding';
import { Connection, ObjectType } from 'typeorm';
import { EntityFactory } from 'typeorm-seeding/dist/entity-factory';
import { User } from './shared/user.entity';
import { root } from 'rxjs/internal-compatibility';

export class UserSeeder implements Seeder {
  async run(factory: <Entity, Settings>(entity: ObjectType<Entity>) => (settings?: Settings) => EntityFactory<Entity, Settings>, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { username: root, password: '1234' },
      ])
      .execute();
  }
}
