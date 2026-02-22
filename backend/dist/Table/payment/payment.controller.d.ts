import { PaymentService } from './payment.service';
import { payment } from './payment.entity';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    findAll(): Promise<payment[]>;
    findOne(id: string): Promise<payment>;
    create(payment: payment): Promise<payment>;
    update(id: string, payment: payment): Promise<payment>;
    remove(id: string): Promise<void>;
}
