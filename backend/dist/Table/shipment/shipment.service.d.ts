import { Repository } from 'typeorm';
import { shipment } from './shipment.entity';
export declare class ShipmentService {
    private shipmentRepository;
    constructor(shipmentRepository: Repository<shipment>);
    findall(): Promise<shipment[]>;
    findOne(ShipmentID: number): Promise<shipment>;
    findByOrder(orderID: number): Promise<shipment>;
    create(shipment: shipment): Promise<shipment>;
    update(ShipmentID: number, shipment: Partial<shipment>): Promise<shipment>;
    remove(ShipmentID: number): Promise<void>;
}
