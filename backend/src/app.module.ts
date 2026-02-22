import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './Table/product/product.module';
import { FiltercategoryModule } from './Table/filtercategory/filtercategory.module';
import { CategoryModule } from './Table/category/category.module';
import { TypeModule } from './Table/type/type.module';
import { StyleModule } from './Table/style/style.module';
import { BrandModule } from './Table/brand/brand.module';
import { AccountModule } from './Table/account/account.module';
import { CartModule } from './Table/cart/cart.module';
import { FavouriteModule } from './Table/favourite/favourite.module';
import { FavouritedetailModule } from './Table/favouritedetail/favouritedetail.module';
import { CartdetailModule } from './Table/cartdetail/cartdetail.module';
import { AuthModule } from './Table/Authentication/authentication.module';
import { CustomerModule } from './Table/customer/customer.module';
import { OrderModule } from './Table/order/order.module';
import { OrderdetailModule } from './Table/orderdetail/orderdetail.module';
import { PaymentModule } from './Table/payment/payment.module';
import { ReceiptModule } from './Table/receipt/receipt.module';
import { ReceiverModule } from './Table/receiver/receiver.module';
import { ShipmentModule } from './Table/shipment/shipment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_Host ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? 'KungofMos32145',
      database: process.env.DB_NAME ?? 'tkmlabs2',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    ProductModule,
    FiltercategoryModule,
    CategoryModule,
    TypeModule,
    StyleModule,
    BrandModule,
    AccountModule,
    CartModule,
    CartdetailModule,
    FavouriteModule,
    FavouritedetailModule,
    AuthModule,
    CustomerModule,
    OrderModule,
    OrderdetailModule,
    PaymentModule,
    ReceiptModule,
    ReceiverModule,
    ShipmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}