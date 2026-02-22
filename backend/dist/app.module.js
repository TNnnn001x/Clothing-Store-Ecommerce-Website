"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const product_module_1 = require("./Table/product/product.module");
const filtercategory_module_1 = require("./Table/filtercategory/filtercategory.module");
const category_module_1 = require("./Table/category/category.module");
const type_module_1 = require("./Table/type/type.module");
const style_module_1 = require("./Table/style/style.module");
const brand_module_1 = require("./Table/brand/brand.module");
const account_module_1 = require("./Table/account/account.module");
const cart_module_1 = require("./Table/cart/cart.module");
const favourite_module_1 = require("./Table/favourite/favourite.module");
const favouritedetail_module_1 = require("./Table/favouritedetail/favouritedetail.module");
const cartdetail_module_1 = require("./Table/cartdetail/cartdetail.module");
const authentication_module_1 = require("./Table/Authentication/authentication.module");
const customer_module_1 = require("./Table/customer/customer.module");
const order_module_1 = require("./Table/order/order.module");
const orderdetail_module_1 = require("./Table/orderdetail/orderdetail.module");
const payment_module_1 = require("./Table/payment/payment.module");
const receipt_module_1 = require("./Table/receipt/receipt.module");
const receiver_module_1 = require("./Table/receiver/receiver.module");
const shipment_module_1 = require("./Table/shipment/shipment.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_Host ?? 'localhost',
                port: parseInt(process.env.DB_PORT ?? '3306', 10),
                username: process.env.DB_USERNAME ?? 'root',
                password: process.env.DB_PASSWORD ?? 'KungofMos32145',
                database: process.env.DB_NAME ?? 'tkmlabs2',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
            }),
            product_module_1.ProductModule,
            filtercategory_module_1.FiltercategoryModule,
            category_module_1.CategoryModule,
            type_module_1.TypeModule,
            style_module_1.StyleModule,
            brand_module_1.BrandModule,
            account_module_1.AccountModule,
            cart_module_1.CartModule,
            cartdetail_module_1.CartdetailModule,
            favourite_module_1.FavouriteModule,
            favouritedetail_module_1.FavouritedetailModule,
            authentication_module_1.AuthModule,
            customer_module_1.CustomerModule,
            order_module_1.OrderModule,
            orderdetail_module_1.OrderdetailModule,
            payment_module_1.PaymentModule,
            receipt_module_1.ReceiptModule,
            receiver_module_1.ReceiverModule,
            shipment_module_1.ShipmentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map