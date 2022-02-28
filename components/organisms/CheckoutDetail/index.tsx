import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

export default function CheckoutDetail() {
  const [dataCheckout, setDataCheckout] = useState({
    verifyID: "",
    nominalItem: {
      price: 0,
      coinName: "",
      coinQuantity: 0,
      _id: "",
    },
    paymentItem: {
      payment: {
        type: "",
        _id: "",
      },
      banks: {
        bankName: "",
        accountNumber: "",
        _id: "",
        name: "",
      },
    },
    bankAccountName: "",
  });
  useEffect(() => {
    const dataFromLocal = localStorage.getItem("Data-Checkout");
    const dataCheckoutLocal = JSON.parse(dataFromLocal!);
    setDataCheckout(dataCheckoutLocal);
  }, []);

  const Price = dataCheckout.nominalItem.price;
  const tax = dataCheckout.nominalItem.price * (10 / 100);
  const totalPrice = Price + tax;
  return (
    <>
      <div className="purchase pt-md-50 pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Purchase Details</h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Game ID <span className="purchase-details"> {dataCheckout.verifyID} </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Order ID <span className="purchase-details">#GG001</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Item{" "}
          <span className="purchase-details">
            {dataCheckout.nominalItem.coinQuantity} {dataCheckout.nominalItem.coinName}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Price{" "}
          <span className="purchase-details">
            {" "}
            <NumberFormat value={Price} prefix="Rp. " displayType="text" thousandSeparator="." decimalSeparator="," />
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tax (10%){" "}
          <span className="purchase-details">
            {" "}
            <NumberFormat value={tax} prefix="Rp. " displayType="text" thousandSeparator="." decimalSeparator="," />
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Total{" "}
          <span className="purchase-details color-palette-4">
            {" "}
            <NumberFormat value={totalPrice} prefix="Rp. " displayType="text" thousandSeparator="." decimalSeparator="," />
          </span>
        </p>
      </div>
      <div className="payment pt-md-50 pb-md-50 pt-10 pb-10">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Payment Informations</h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Account Name <span className="purchase-details">{dataCheckout.bankAccountName}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Type <span className="payment-details">{dataCheckout.paymentItem.payment.type}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Name <span className="payment-details">{dataCheckout.paymentItem.banks.bankName}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Account Name <span className="payment-details">{dataCheckout.paymentItem.banks.name} </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Number <span className="payment-details">{dataCheckout.paymentItem.banks.accountNumber}</span>
        </p>
      </div>
    </>
  );
}
