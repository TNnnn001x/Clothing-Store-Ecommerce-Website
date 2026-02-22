import { account } from "src/Table/account/account.entity";

declare namespace Express {
  interface Request {
    user?: account;
  }
}