// src/components/OrdersTable.jsx
import { BsThreeDots } from "react-icons/bs";

const OrdersTable = () => {
  const orders = [
    {
      id: "#2456JL",
      product: "Nike Sportswear",
      date: "Jan 12 , 12:23 pm",
      price: "$ 134.00",
      payment: "Transfer",
      status: "Processing",
    },
    {
      id: "#5435DF",
      product: "Acqua di Parma",
      date: "May 01 , 01:13 pm",
      price: "$ 23.00",
      payment: "Credit Card",
      status: "Completed",
    },
    {
      id: "#9876XC",
      product: "Allen Solly",
      date: "Sep 20 , 09:08 am",
      price: "$ 441.00",
      payment: "Transfer",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Latest Orders</h3>
        <div className="flex gap-4 text-sm text-gray-600">
          <button className="hover:text-black">Customize</button>
          <button className="hover:text-black">Filter</button>
          <button className="hover:text-black">Export</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="pb-2">Order ID</th>
              <th>Product</th>
              <th>Order Date</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="py-3">{order.id}</td>
                <td>{order.product}</td>
                <td>{order.date}</td>
                <td>{order.price}</td>
                <td>{order.payment}</td>
                <td>
                  {order.status === "Completed" ? (
                    <span className="text-green-600 font-medium">
                      {order.status}
                    </span>
                  ) : (
                    <span className="text-blue-500 font-medium">
                      {order.status}
                    </span>
                  )}
                </td>
                <td className=" pl-5 ">
                  <BsThreeDots className="text-gray-500 cursor-pointer " />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
