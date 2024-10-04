import { useState, useEffect } from "react";
import { message } from "antd";
import {
  getCustomers,
  addCustomer,
  editCustomer,
  deleteCustomer,
} from "../utils/api";

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      message.error("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  const addNewCustomer = async (data) => {
    try {
      await addCustomer(data);
      message.success("Customer added successfully.");
      loadCustomers();
    } catch (error) {
      message.error("Failed to add customer.");
    }
  };

  const updateCustomer = async (id, data) => {
    try {
      await editCustomer(id, data);
      message.success("Customer updated successfully.");
      loadCustomers();
    } catch (error) {
      message.error("Failed to update customer.");
    }
  };

  const removeCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      message.success("Customer deleted successfully.");
      loadCustomers();
    } catch (error) {
      message.error("Failed to delete customer.");
    }
  };

  return {
    customers,
    loading,
    addNewCustomer,
    updateCustomer,
    removeCustomer,
  };
};

export default useCustomers;
