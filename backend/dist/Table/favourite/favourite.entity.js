"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favourite = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("../account/account.entity");
const favouritedetail_entity_1 = require("../favouritedetail/favouritedetail.entity");
let favourite = class favourite {
    FavID;
    FavouriteDetails;
    Accounts;
    AccID;
};
exports.favourite = favourite;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], favourite.prototype, "FavID", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favouritedetail_entity_1.favouritedetail, (Favd) => Favd.Favourites),
    __metadata("design:type", Array)
], favourite.prototype, "FavouriteDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.account, (a) => a.Favourites),
    (0, typeorm_1.JoinColumn)({ name: "AccID" }),
    __metadata("design:type", account_entity_1.account)
], favourite.prototype, "Accounts", void 0);
__decorate([
    (0, typeorm_1.RelationId)((Favourite) => Favourite.Accounts),
    __metadata("design:type", Number)
], favourite.prototype, "AccID", void 0);
exports.favourite = favourite = __decorate([
    (0, typeorm_1.Entity)()
], favourite);
//# sourceMappingURL=favourite.entity.js.map