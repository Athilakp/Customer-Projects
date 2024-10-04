import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import useCustomers from "../hooks/useCustomers";
import CustomerForm from "../forms/CustomerForm";

const Customers = () => {
  const { customers, loading, addNewCustomer, updateCustomer, removeCustomer } =
    useCustomers();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({ Customer_Name: "" });
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleAdd = () => {
    setFormData({ Customer_Name: "" });
    setEditingCustomer(null);
    setIsModalVisible(true);
  };

  const handleEdit = (customer) => {
    setFormData({ Customer_Name: customer.Customer_Name });
    setEditingCustomer(customer);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    await removeCustomer(id);
  };

  const handleFormSubmit = async () => {
    if (!formData.Customer_Name) {
      return;
    }

    if (editingCustomer) {
      await updateCustomer(editingCustomer.id, formData);
    } else {
      await addNewCustomer(formData);
    }
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, Customer_Name: e.target.value });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "Customer_Name",
      key: "Customer_Name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (customer) => (
        <>
          <Button type="link" onClick={() => handleEdit(customer)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(customer.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Customers</h2>
      <div className="add-button-container">
        <Button type="primary" onClick={handleAdd}>
          + Add Customer
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={customers}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingCustomer ? "Edit Customer" : "Add Customer"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleFormSubmit}
        okText={editingCustomer ? "Save Changes" : "Add Customer"}
      >
        <CustomerForm
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </Modal>
    </div>
  );
};

export default Customers;
