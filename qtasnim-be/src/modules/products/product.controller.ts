import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Query,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
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

  @Get('detail/:id')
  async findById(@Param('id') id: number) {
    return await this.productService.findOneById(id);
  }

  @Get('findAndSort')
  async searchAndSortProducts(
    @Query('query') query: string,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: string,
  ): Promise<Product[]> {
    return await this.productService.searchAndSortProducts(
      query,
      sortBy,
      sortOrder,
    );
  }

  @Get('compare')
  async compareTransactionsByProductType(
    @Query('compareType') compareType: 'most' | 'least',
  ): Promise<Product[]> {
    const konsumsi = await this.productService.compareTransactionsByProductType(
      'Konsumsi',
      compareType,
    );
    const pembersih =
      await this.productService.compareTransactionsByProductType(
        'Pembersih',
        compareType,
      );
    return konsumsi.concat(pembersih);
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

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() product: ProductDto,
  ): Promise<Product> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedProduct } =
      await this.productService.update(id, product);

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Product doesn't exist");
    }

    // return the updated post
    return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    // delete the post with this id
    const deleted = await this.productService.delete(id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Product doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
