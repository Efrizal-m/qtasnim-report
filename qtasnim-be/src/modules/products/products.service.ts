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
  ): Promise<Product[]> {
    let whereCondition = {};
    let order = [];

    // Search by product name
    if (query) {
      whereCondition = {
        ...whereCondition,
        name: { [Op.iLike]: `%${query}%` }, // Op.iLike for case-insensitive search
      };
    }

    // Sort by transaction date
    if (sortBy === 'transactionDate') {
      order = [['transactionDate', 'ASC']]; // Set order by transaction date (ASC = ascending)
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
      SELECT p.*
      FROM products p
      WHERE p.type = :productType
      ORDER BY p.quantity ${compareType === 'most' ? 'DESC' : 'ASC'}
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
