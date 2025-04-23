"use client";

import { useState, useEffect } from "react";

// Define the types based on the provided data structure
interface Money {
  amount: string;
  currency_code: string;
}

interface MoneySet {
  shop_money: Money;
  presentment_money: Money;
}

interface Address {
  first_name: string;
  last_name: string;
  address1: string;
  city: string;
  country: string;
  province: string;
  zip: string;
}

interface Customer {
  default_address: Address;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface ClientDetails {
  accept_language: string;
  browser_ip: string;
  user_agent: string;
}

interface TaxLine {
  price_set: MoneySet;
  price: string;
  rate: number;
  title: string;
}

interface Order {
  _id: string;
  id: number;
  admin_graphql_api_id: string;
  contact_email: string;
  email: string;
  client_details: ClientDetails;
  currency: string;
  financial_status: string;
  current_total_price_set: MoneySet;
  total_tax_set: MoneySet;
  billing_address: Address;
  customer: Customer;
  tax_lines: TaxLine[];
  test: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersDisplay() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://api.pyramid.ajayasok.in/orders");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-container">
      <h1>Orders</h1>

      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>#{order.id}</td>
                <td>
                  {order.customer.first_name} {order.customer.last_name}
                </td>
                <td>{order.email}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td>
                  {order.current_total_price_set.shop_money.amount}{" "}
                  {order.current_total_price_set.shop_money.currency_code}
                </td>
                <td>
                  <span className={`status ${order.financial_status}`}>
                    {order.financial_status}
                  </span>
                </td>
                <td>
                  <button
                    className="view-details-btn"
                    onClick={() => openModal(order)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order #{selectedOrder.id}</h2>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="order-info-section">
                <h3>Order Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Order ID:</span>
                    <span className="value">#{selectedOrder.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Date:</span>
                    <span className="value">
                      {formatDate(selectedOrder.createdAt)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Status:</span>
                    <span
                      className={`value status ${selectedOrder.financial_status}`}
                    >
                      {selectedOrder.financial_status}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Currency:</span>
                    <span className="value">{selectedOrder.currency}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Total Amount:</span>
                    <span className="value">
                      {selectedOrder.current_total_price_set.shop_money.amount}{" "}
                      {
                        selectedOrder.current_total_price_set.shop_money
                          .currency_code
                      }
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Tax Amount:</span>
                    <span className="value">
                      {selectedOrder.total_tax_set.shop_money.amount}{" "}
                      {selectedOrder.total_tax_set.shop_money.currency_code}
                    </span>
                  </div>
                </div>
              </div>

              <div className="customer-section">
                <h3>Customer Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Name:</span>
                    <span className="value">
                      {selectedOrder.customer.first_name}{" "}
                      {selectedOrder.customer.last_name}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{selectedOrder.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Customer ID:</span>
                    <span className="value">{selectedOrder.customer.id}</span>
                  </div>
                </div>
              </div>

              <div className="billing-section">
                <h3>Billing Address</h3>
                <div className="address">
                  <p>
                    {selectedOrder.billing_address.first_name}{" "}
                    {selectedOrder.billing_address.last_name}
                  </p>
                  <p>{selectedOrder.billing_address.address1}</p>
                  <p>
                    {selectedOrder.billing_address.city},{" "}
                    {selectedOrder.billing_address.province}{" "}
                    {selectedOrder.billing_address.zip}
                  </p>
                  <p>{selectedOrder.billing_address.country}</p>
                </div>
              </div>

              <div className="tax-section">
                <h3>Tax Information</h3>
                <table className="tax-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.tax_lines.map((tax, index) => (
                      <tr key={index}>
                        <td>{tax.title}</td>
                        <td>{tax.rate * 100}%</td>
                        <td>
                          {tax.price_set.shop_money.amount}{" "}
                          {tax.price_set.shop_money.currency_code}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="test-order">
                {selectedOrder.test && <p className="test-badge">Test Order</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* General Styles */
        .orders-container {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          color: #333;
          margin-bottom: 20px;
        }

        /* Table Styles */
        .table-container {
          overflow-x: auto;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .orders-table th,
        .orders-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .orders-table th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #333;
        }

        .orders-table tr:hover {
          background-color: #f5f5f5;
        }

        .status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          text-transform: capitalize;
        }

        .status.paid {
          background-color: #d4edda;
          color: #155724;
        }

        .status.pending {
          background-color: #fff3cd;
          color: #856404;
        }

        .status.refunded {
          background-color: #f8d7da;
          color: #721c24;
        }

        .view-details-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .view-details-btn:hover {
          background-color: #0069d9;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          border-radius: 8px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid #dee2e6;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6c757d;
        }

        .close-btn:hover {
          color: #343a40;
        }

        .modal-body {
          padding: 20px;
        }

        .order-info-section,
        .customer-section,
        .billing-section,
        .tax-section {
          margin-bottom: 25px;
        }

        h3 {
          color: #495057;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e9ecef;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
        }

        .label {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 5px;
        }

        .value {
          font-weight: bold;
          color: #212529;
        }

        .address p {
          margin: 5px 0;
          line-height: 1.5;
        }

        .tax-table {
          width: 100%;
          border-collapse: collapse;
        }

        .tax-table th,
        .tax-table td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #dee2e6;
        }

        .tax-table th {
          background-color: #f8f9fa;
          font-weight: bold;
        }

        .test-badge {
          display: inline-block;
          background-color: #ffc107;
          color: #212529;
          padding: 5px 10px;
          border-radius: 4px;
          font-weight: bold;
          font-size: 14px;
        }

        /* Loading and Error States */
        .loading,
        .error {
          padding: 20px;
          text-align: center;
          background-color: #f8f9fa;
          border-radius: 4px;
          margin: 20px 0;
        }

        .error {
          color: #721c24;
          background-color: #f8d7da;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .modal-content {
            width: 95%;
            max-height: 95vh;
          }
        }
      `}</style>
    </div>
  );
}
