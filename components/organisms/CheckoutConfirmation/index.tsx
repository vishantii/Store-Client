import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { setCheckout } from "../../../services/player";

export default function CheckoutConfirmation() {
  const [checkBox, setCheckBox] = useState(false);
  const router = useRouter();
  const onSubmit = async () => {
    const dataCheckoutLocal = localStorage.getItem("Data-Checkout");
    const dataItemLocal = localStorage.getItem("Data-Item");
    const dataItem = JSON.parse(dataItemLocal!);
    const dataCheckout = JSON.parse(dataCheckoutLocal!);
    if (!checkBox) {
      toast.error("Please Do Payment");
    }

    const data = {
      voucher: dataItem._id,
      nominal: dataCheckout.nominalItem._id,
      payment: dataCheckout.paymentItem.payment._id,
      bank: dataCheckout.paymentItem.banks._id,
      name: dataCheckout.bankAccountName,
      accountUser: dataCheckout.verifyID,
    };

    const response = await setCheckout(data);

    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Checkout Success");

      router.push("/complete-checkout");
    }
  };
  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input onChange={() => setCheckBox(!checkBox)} checked={checkBox} type="checkbox" />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button onClick={onSubmit} className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg" type="button" role="button">
          Confirm Payment
        </button>
      </div>
    </>
  );
}
