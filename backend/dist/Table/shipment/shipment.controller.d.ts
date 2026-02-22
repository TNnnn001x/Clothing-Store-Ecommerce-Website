import { ShipmentService } from './shipment.service';
import { shipment } from './shipment.entity';
export declare class ShipmentController {
    private readonly shipmentService;
    constructor(shipmentService: ShipmentService);
    findAll(): Promise<shipment[]>;
    findOne(id: string): Promise<shipment>;
    getShipmentByOrder(orderID: number): Promise<shipment>;
    create(shipment: shipment): Promise<shipment>;
    update(id: string, shipment: shipment): Promise<shipment>;
    remove(id: string): Promise<void>;
}
