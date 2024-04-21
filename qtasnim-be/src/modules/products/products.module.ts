import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { productsProviders } from './products.providers';
import { ProductController } from './product.controller';

@Module({
  providers: [ProductsService, ...productsProviders],
  controllers: [ProductController],
})
export class ProductsModule {}
