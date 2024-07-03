import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ amount, onSuccess }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderID) => {
    setPaidFor(true);
    onSuccess(orderID);
  };

  if (paidFor) {
    return <div>Payment successful! Thank you for your purchase.</div>;
  }

  if (error) {
    return <div>Error in processing payment. Please try again.</div>;
  }

  return (
    <PayPalScriptProvider options={{ "client-id": "Ac6pyygYRF8_-7wJesHcxFxsSEBSHcRer1indkkkqVATHRoYkT13vbDwA_yxeyqy5EvzESnTQ9Py_krR" }}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
              },
            }],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          handleApprove(order.id);
        }}
        onError={(err) => {
          setError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
