import React from "react";
import { CardProductOrder } from "../components/orderList";

const Cancel = ({ paymentConfirmasi }) => {
  return (
    <div className="border_content-orderlist">
      <div className="parent_content-orlis">
        <CardProductOrder
          paymentConfirmasi={paymentConfirmasi}
          status={"cansel"}
        />
      </div>
    </div>
  );
};

export default Cancel;
