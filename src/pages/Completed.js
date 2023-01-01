import React from "react";
import { CardProductOrder } from "../components/orderList";

const Completed = ({ paymentConfirmasi }) => {
  return (
    <div className="border_content-orderlist">
      <div className="parent_content-orlis"></div>
      <CardProductOrder
        paymentConfirmasi={paymentConfirmasi}
        status={"completed"}
      />
    </div>
  );
};

export default Completed;
