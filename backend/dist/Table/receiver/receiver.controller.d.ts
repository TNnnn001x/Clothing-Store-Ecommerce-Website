import { ReceiverService } from './receiver.service';
import { receiver } from './receiver.entity';
export declare class ReceiverController {
    private readonly receiverService;
    constructor(receiverService: ReceiverService);
    findAll(): Promise<receiver[]>;
    findByCustomer(custID: string): Promise<receiver[]>;
    findOne(id: string): Promise<receiver>;
    create(receiver: receiver): Promise<receiver>;
    update(id: string, receiver: receiver): Promise<receiver>;
    remove(id: string): Promise<void>;
}
