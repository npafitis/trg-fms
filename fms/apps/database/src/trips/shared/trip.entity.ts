import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Driver } from '../../drivers/shared/driver.entity';
import { Car } from '../../cars/shared/car.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Driver)
  driver: Driver;

  @ManyToOne(type => Car)
  car: Car;

  @Column()
  date: Date;
}
