import React, { useEffect, useState } from 'react';
import './DeliveryAssets/deli.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import { fetchCustomer, fetchOrdersByCustomer, fetchOrderDetails, fetchShipmentByOrder } from '../../store/DeliverySlice';
import { selectAccount } from '../../store/NavbarSlice';
import { type RootState } from '../../store';
import { type Order, type Shipment } from '../../store/DeliverySlice';
import { type Receiver } from '../../store/checkOutSlice';

export type DeliveryStatusType = 'pending' | 'shipped' | 'ondelivery' | 'delivered';

const STATUS_STEPS: DeliveryStatusType[] = ['pending', 'shipped', 'ondelivery', 'delivered'];
const STATUS_LABELS_TH: Record<DeliveryStatusType, string> = {
  pending: 'กำลังเตรียม',
  shipped: 'จัดส่งแล้ว',
  ondelivery: 'กำลังนำส่ง',
  delivered: 'ส่งสำเร็จ',
};

const DeliveryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const Account = useSelector(selectAccount)
  const { Orders, Shipments, loading } = useSelector((state: RootState) => state.shipment);
  
  const [selectOrder, setSelectOrder] = useState<Order | undefined>(undefined);
  const [OrderIdx, setOrderIdx] = useState<number>(0);
  const [selectReceiver, setSelectReceiver] = useState<Receiver | undefined>(undefined);
  const [selectProducts, setSelectProducts] = useState<any[]>([]);
  const [currentStatusIndex, setCurrentStatusIndex] = useState<number | undefined>(undefined);
  const [selectShipment, setSelectShipment] = useState<Shipment | undefined>(undefined);

  useEffect(() => {
    if (Account) {
      dispatch(fetchCustomer(Account?.AccID))
        .unwrap()
        .then(cust => {
          const custID = cust.CustID;
          dispatch(fetchOrdersByCustomer(custID))
            .unwrap()
            .then(orders => {
              orders.forEach(o => {
                if (o.OrderID) {
                  dispatch(fetchOrderDetails(o.OrderID));
                  dispatch(fetchShipmentByOrder(o.OrderID));
                }
              });
            });
        })
        .catch(err => console.error(err));
    }
    if( Orders){
      setSelectOrder(Orders[0]);
    }
  }, [Account, dispatch]);

  useEffect(() => {
    if (!selectOrder?.OrderID) {
      setSelectShipment(undefined);
      setSelectReceiver(undefined);
      setSelectProducts([]);
      setCurrentStatusIndex(undefined);
      return;
    }

    const orderID = selectOrder.OrderID;

    const shipment = Shipments.find(s => s.Orders.OrderID === orderID);
    if (!shipment) return
    setSelectShipment(shipment);

    setSelectReceiver(selectOrder.Receivers);

    const productList =
      selectOrder.OrderDetails?.map(od => ({
        productName: od.Products?.ProdName || 'ไม่มีชื่อสินค้า',
        quantity: od.Quantity,
        price: od.Products?.Price || 0,
        imageUrl: od.Products?.ProdPicture || 'https://via.placeholder.com/150',
        description: od.Products?.ProdDetail || ''
      })) || [];

    setSelectProducts(productList);

    const currentstatusIndex = STATUS_STEPS.indexOf(shipment.ShipmentStatus);

    setCurrentStatusIndex(currentstatusIndex);

  }, [selectOrder, Shipments])

  if (loading) return <div>Loading...</div>;
  if (!Orders.length) return <div>ไม่มีคำสั่งซื้อ</div>;

  const handleOrder = (order: Order, index: number) => {
    setSelectOrder(order)
    setOrderIdx(index)
  }

  return (
    <div className='w-screen min-h-screen flex items-start pt-20 pb-10 px-10 gap-6'>
      <div className='h-[85dvh] w-56 bg-gray-200 border-2 rounded-2xl overflow-hidden shadow-lg shadow-black'>
        {
          Orders.map((ord, i) => (
            <div
              key={i}
              className={`w-full h-24 px-4 border-b border-gray-300 cursor-pointer 
                           transition duration-300 ease-in-out
                           hover:bg-indigo-200 hover:shadow-md hover:shadow-indigo-100
                           ${OrderIdx === i ? "bg-indigo-200" : "bg-white "}`}
            >
              <div
                onClick={() => handleOrder(ord, i)}
                className='flex flex-col gap-1 h-full'>
                <div className='font-semibold text-gray-800 truncate pt-2'>
                  รายการคำสั่งซื้อ #{ord.OrderID}
                </div>
                <div className={`text-sm font-medium mt-2 ${ord.OrderStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  สถานะ: {ord.OrderStatus === 'completed' ? "ชำระเงินเรียบร้อย" : "รอการชำระเงิน"}
                </div>
                <div className='text-xs text-gray-500'>
                  วันที่: {ord.OrderDate.toString().slice(0, 10)}
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div style={{ minHeight: '85vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {selectOrder && (
            <div
              style={{
                maxWidth: '1100px',
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                padding: '30px 40px',
                display: 'flex',
                flexDirection: 'row',
                gap: '20rem',
                margin: '0 auto'
              }}
            >
              <div>
                {/* ****************** ปัญหาคือ ข้อมูลผู้รับเป็นคนเดิมตลอดเลย ************************* */}
                {/* ✅ ข้อมูลผู้รับ */}
                <div style={{ lineHeight: '1.8' }}>
                  <strong>ข้อมูลผู้รับ:</strong><br />
                  ชื่อ: {selectReceiver?.RecName} {selectReceiver?.RecLname} <br />
                  เบอร์โทร: {selectReceiver?.RecPhone} <br />
                  ที่อยู่: {selectReceiver?.RecAddr}
                </div>
                {/* ✅ สถานะการจัดส่ง + Timeline */}
                <div className='mt-8'>
                  <strong>สถานะ:</strong> {selectShipment
                    ? STATUS_LABELS_TH[selectShipment.ShipmentStatus as DeliveryStatusType]
                    : 'กำลังโหลด...'} <br />
                  วันที่จัดส่ง: {selectShipment?.ShipmentDate
                    ? new Date(selectShipment?.ShipmentDate).toLocaleDateString('th-TH', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                    : '-'}
                  {/* Timeline */}
                  {(() => {
                    if (currentStatusIndex === undefined) return;
                    const completedColor = '#28a745';
                    const activeColor = '#007bff';
                    const pendingColor = '#e0e0e0';
                    const line1Color = currentStatusIndex >= 1 ? completedColor : pendingColor;
                    const line2Color = currentStatusIndex >= 2 ? completedColor : pendingColor;
                    const line3Color = currentStatusIndex >= 3 ? completedColor : pendingColor;
                    const circleColors = STATUS_STEPS.map((_, index) => {
                      if (index < currentStatusIndex) return completedColor;
                      if (index === currentStatusIndex) return activeColor;
                      return pendingColor;
                    });
                    return (
                      <div className="-translate-x-10" style={{ marginTop: '20px' }}>
                        <svg viewBox="0 0 200 20" width="100%" style={{ overflow: 'visible' }}>
                          <path d="M 50 18 L 170 18" stroke={line1Color} strokeWidth="3" fill="none" />
                          <path d="M 170 18 L 290 18" stroke={line2Color} strokeWidth="3" fill="none" />
                          <path d="M 290 18 L 410 18" stroke={line3Color} strokeWidth="3" fill="none" />
                          {STATUS_STEPS.map((step, i) => (
                            <React.Fragment key={i}>
                              <circle cx={50 + 120 * i} cy="18" r="8" fill={circleColors[i]} />
                              <text x={50 + 120 * i} y="36" fontSize="8" textAnchor="middle">
                                {STATUS_LABELS_TH[step]}
                              </text>
                            </React.Fragment>
                          ))}
                        </svg>
                      </div>
                    );
                  })()}
                </div>
              </div>
              {/* แสดงแยกของแต่ละ Order ถูกต้องแล้ว */}
              {/* ✅ ข้อมูลสินค้า */}
              <div>
                <strong>ข้อมูลสินค้า:</strong>
                {selectProducts.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '15px',
                      marginTop: '10px',
                      padding: '10px',
                      background: '#DBD3D3',
                      borderRadius: '10px',
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                      }}
                    />
                    <div>
                      <p><strong>สินค้า:</strong> {item.productName}</p>
                      <p>จำนวน: {item.quantity}</p>
                      <p>ราคา: {item.price.toLocaleString()} บาท</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
