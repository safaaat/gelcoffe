import React from "react";
import { CardProductOrder } from "../components/orderList/index";

const Confirmasi = ({ paymentConfirmasi, updateIdConfirmasi }) => {
  return (
    <>
      <div className="border_content-orderlist">
        <div className="parent_content-orlis">
          <CardProductOrder
            paymentConfirmasi={paymentConfirmasi}
            status={"confirmasi"}
            updateIdConfirmasi={updateIdConfirmasi}
          />
        </div>
      </div>
    </>
  );
};

export default Confirmasi;
