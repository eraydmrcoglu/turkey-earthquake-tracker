import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Deprem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tarih: string;

  @Column()
  saat: string;

  @Column()
  enlem: string;

  @Column()
  boylam: string;

  @Column()
  derinlik: string;

  @Column()
  buyukluk: string;

  @Column()
  yer: string;

  @CreateDateColumn()
  createdAt: Date;
}
