import { Repository } from 'typeorm';
import { receipt } from './receipt.entity';
export declare class ReceiptService {
    private receiptRepository;
    constructor(receiptRepository: Repository<receipt>);
    findall(): Promise<receipt[]>;
    findOne(ReceiptID: number): Promise<receipt>;
    create(receipt: receipt): Promise<receipt>;
    update(ReceiptID: number, receipt: Partial<receipt>): Promise<receipt>;
    remove(ReceiptID: number): Promise<void>;
}
