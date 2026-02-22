import { ReceiptService } from './receipt.service';
import { receipt } from './receipt.entity';
export declare class ReceiptController {
    private readonly receiptService;
    constructor(receiptService: ReceiptService);
    findAll(): Promise<receipt[]>;
    findOne(id: string): Promise<receipt>;
    create(receipt: receipt): Promise<receipt>;
    update(id: string, receipt: receipt): Promise<receipt>;
    remove(id: string): Promise<void>;
}
