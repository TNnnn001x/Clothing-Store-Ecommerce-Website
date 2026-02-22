import { Repository } from 'typeorm';
import { payment } from './payment.entity';
export declare class PaymentService {
    private paymentRepository;
    constructor(paymentRepository: Repository<payment>);
    findall(): Promise<payment[]>;
    findOne(PaymentID: number): Promise<payment>;
    create(payment: payment): Promise<payment>;
    update(PaymentID: number, payment: Partial<payment>): Promise<payment>;
    remove(PaymentID: number): Promise<void>;
}
