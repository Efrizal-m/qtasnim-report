import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  // Primary key with auto-increment
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nama_barang: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stok: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  jumlah_terjual: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  tanggal_terjual: Date;

  @Column({
    type: DataType.ENUM,
    values: ['Konsumsi', 'Pembersih'],
    allowNull: false,
  })
  jenis_barang: string;
}
