// src/components/AddressList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  deleteAddress,
} from "../features/address/addressSlice";

const AddressList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.addresses);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Address List</h2>
      <ul>
        {items.map((address) => (
          <li key={address._id}>
            {address.street}, {address.city}, {address.zip}
            <button onClick={() => dispatch(deleteAddress(address._id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
