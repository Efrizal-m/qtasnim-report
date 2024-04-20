import { Controller, Body, Post, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from '../products/dto/product.dto';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductsService) {}

  @Post()
  async create(@Body() product: ProductDto) {
    return await this.productService.create(product);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.productService.findOneById(id);
  }

  @Get('findAndSort')
  async searchAndSortProducts(
    @Query('query') query: string,
    @Query('sortBy') sortBy: string,
  ): Promise<Product[]> {
    return await this.productService.searchAndSortProducts(query, sortBy);
  }

  @Get('compare')
  async compareTransactionsByProductType(
    @Query('productType') productType: string,
    @Query('compareType') compareType: 'most' | 'least',
  ): Promise<Product[]> {
    return await this.productService.compareTransactionsByProductType(
      productType,
      compareType,
    );
  }

  @Get('filterByDate')
  async getProductsByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<Product[]> {
    // Validate date range (You can add validation logic here)
    const validStartDate = new Date(startDate);
    const validEndDate = new Date(endDate);

    // Call the service method to fetch products within the date range
    return await this.productService.getProductsByDateRange(
      validStartDate,
      validEndDate,
    );
  }
}
