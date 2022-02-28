import { useState } from "react";
import { BankTypes, NominalsTypes, PaymentTypes } from "../../../services/data-types";
import NominalItem from "./NominalItem";
import PaymentItem from "./PaymentItem";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface TopUpFormProps {
  nominals: NominalsTypes[];
  payments: PaymentTypes[];
}

export default function TopUpForm(props: TopUpFormProps) {
  const { nominals, payments } = props;
  const [verifyID, setVerifyID] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [nominalItem, setNominalItem] = useState({});
  const [paymentItem, setPaymentItem] = useState({});
  const route = useRouter();

  const onNominalChange = (data: NominalsTypes) => {
    setNominalItem(data);
  };
  const onPaymentChange = (payment: PaymentTypes, banks: BankTypes) => {
    const data = {
      payment,
      banks,
    };
    setPaymentItem(data);
  };
  const onSubmit = () => {
    if (verifyID === "" || bankAccountName === "" || nominalItem === {} || paymentItem === {}) {
      toast.error("Please Insert All Data");
    } else {
      const data = {
        verifyID,
        bankAccountName,
        nominalItem,
        paymentItem,
      };
      localStorage.setItem("Data-Checkout", JSON.stringify(data));
      route.push("/checkout");
    }
  };
  return (
    <>
      <div className="pt-md-50 pt-30">
        <div className="">
          <label htmlFor="ID" className="form-label text-lg fw-medium color-palette-1 mb-10">
            Verify ID
          </label>
          <input value={verifyID} onChange={(e) => setVerifyID(e.target.value)} type="text" className="form-control rounded-pill text-lg" id="ID" name="ID" aria-describedby="verifyID" placeholder="Enter your ID" />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">Nominal Top Up</p>
        <div className="row justify-content-between">
          {nominals.map((nominal) => {
            return <NominalItem key={nominal._id} _id={nominal._id} coinName={nominal.coinName} coinQuantity={nominal.coinQuantity} price={nominal.price} onChange={() => onNominalChange(nominal)} />;
          })}

          <div className="col-lg-4 col-sm-6" />
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">Payment Method</p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {payments.map((payment) => {
              return payment.bank.map((banks) => {
                return <PaymentItem key={banks._id} bankID={banks._id} type={payment.type} name={banks.bankName} onChange={() => onPaymentChange(payment, banks)} />;
              });
            })}
            <div className="col-lg-4 col-sm-6" />
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label htmlFor="bankAccount" className="form-label text-lg fw-medium color-palette-1 mb-10">
          Bank Account Name
        </label>
        <input
          value={bankAccountName}
          onChange={(e) => setBankAccountName(e.target.value)}
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button onClick={onSubmit} type="button" className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg">
          Continue
        </button>
      </div>
    </>
  );
}
