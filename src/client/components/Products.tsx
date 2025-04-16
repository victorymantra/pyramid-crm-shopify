import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message } from "antd";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  inventoryQuantity: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      message.error("Failed to fetch products");
    }
  };

  const handleCreate = async (values: any) => {
    try {
      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Product created successfully");
        fetchProducts();
        setIsModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      message.error("Failed to create product");
    }
  };

  const handleUpdate = async (values: any) => {
    if (!editingProduct) return;
    try {
      const response = await fetch(
        `http://localhost:4000/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        message.success("Product updated successfully");
        fetchProducts();
        setIsModalVisible(false);
        form.resetFields();
        setEditingProduct(null);
      }
    } catch (error) {
      message.error("Failed to update product");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Product deleted successfully");
        fetchProducts();
      }
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const handleInventoryUpdate = async (id: string, quantity: number) => {
    try {
      const response = await fetch(`/api/products/${id}/inventory`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      if (response.ok) {
        message.success("Inventory updated successfully");
        fetchProducts();
      }
    } catch (error) {
      message.error("Failed to update inventory");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Inventory",
      dataIndex: "inventoryQuantity",
      key: "inventoryQuantity",
      render: (quantity: number, record: Product) => (
        <InputNumber
          min={0}
          value={quantity}
          onChange={(value) => handleInventoryUpdate(record._id, value)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setEditingProduct(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setEditingProduct(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Product
      </Button>

      <Table dataSource={products} columns={columns} rowKey="_id" />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingProduct(null);
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={editingProduct ? handleUpdate : handleCreate}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="sku" label="SKU">
            <Input />
          </Form.Item>

          <Form.Item name="inventoryQuantity" label="Initial Inventory">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
