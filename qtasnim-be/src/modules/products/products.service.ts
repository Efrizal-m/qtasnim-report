import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { PRODUCT_REPOSITORY } from '../../core/constants';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async create(product: ProductDto): Promise<Product> {
    return await this.productRepository.create<Product>(product);
  }

  async findOneById(id: number): Promise<Product> {
    return await this.productRepository.findOne<Product>({
      where: { id },
    });
  }

  async delete(id: number) {
    return await this.productRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedProduct]] =
      await this.productRepository.update(
        {
          ...data,
        },
        {
          where: { id },
          returning: true,
        },
      );
    return { numberOfAffectedRows, updatedProduct };
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll<Product>();
  }

  async searchAndSortProducts(
    query: string,
    sortBy: string,
    sortOrder: string,
  ): Promise<Product[]> {
    let whereCondition = {};
    let order = [];

    // Search by product name
    if (query) {
      whereCondition = {
        ...whereCondition,
        nama_barang: { [Op.iLike]: `%${query}%` }, // Op.iLike for case-insensitive search
      };
    }
    sortOrder = sortOrder.toUpperCase();
    // Sort by transaction date
    if (sortBy === 'tanggal_terjual') {
      order = [['tanggal_terjual', sortOrder]];
    } else if (sortBy === 'nama_barang') {
      order = [['nama_barang', sortOrder]];
    } else if (sortBy === 'stok') {
      order = [['stok', sortOrder]];
    } else if (sortBy === 'jumlah_terjual') {
      order = [['jumlah_terjual', sortOrder]];
    }

    // Query the database
    return await this.productRepository.findAll({
      where: whereCondition,
      order,
    });
  }
  async compareTransactionsByProductType(
    productType: string,
    compareType: 'most' | 'least',
  ): Promise<Product[]> {
    const query = `
      SELECT *
      FROM "Products"
      WHERE jenis_barang = :productType
      ORDER BY jumlah_terjual ${compareType === 'most' ? 'DESC' : 'ASC'}
      LIMIT 1
    `;

    return await this.productRepository.sequelize.query(query, {
      model: Product,
      mapToModel: true,
      replacements: { productType },
    });
  }

  async getProductsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Product[]> {
    // Query the database for products within the date range
    console.log(startDate, endDate);
    return await this.productRepository.findAll({
      where: {
        tanggal_terjual: {
          [Op.and]: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
      },
    });
  }
}
