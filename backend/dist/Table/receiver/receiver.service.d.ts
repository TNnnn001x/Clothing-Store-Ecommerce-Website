import { Repository } from 'typeorm';
import { receiver } from './receiver.entity';
export declare class ReceiverService {
    private receiverRepository;
    constructor(receiverRepository: Repository<receiver>);
    findall(): Promise<receiver[]>;
    findByCustomer(custID: number): Promise<receiver[]>;
    findOne(RecID: number): Promise<receiver>;
    create(receiver: receiver): Promise<receiver>;
    update(RecID: number, receiver: Partial<receiver>): Promise<receiver>;
    remove(RecID: number): Promise<void>;
}
