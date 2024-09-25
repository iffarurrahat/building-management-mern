import "./CheckoutForm.css";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";
import { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ setIsOpen, booking, totalAmount, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  console.log(totalAmount);

  useEffect(() => {
    // fetch client secret
    if (totalAmount && totalAmount > 1) {
      getClientSecret({ rent: totalAmount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount]);

  //get clientSecret
  const getClientSecret = async (rent) => {
    const { data } = await axiosSecure.post("/create-payment-intent", rent);
    setClientSecret(data.clientSecret);
    console.log("Client secret form server-->", data);
    // return data;
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    //confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      // 1. create payment info object
      const paymentInfo = {
        ...booking,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      delete paymentInfo._id;
      console.log("paymentInfo:", paymentInfo);

      try {
        // 2. save payment info in booking collection (db)
        const { data } = await axiosSecure.post("/payment", paymentInfo);
        console.log(data);

        // 3. change apartment status to booked in db
        await axiosSecure.post(`/rooms/status/${booking?._id}`, paymentInfo);

        //update ui
        refetch();
        setIsOpen(false);
        toast.success("Your Payment Successful");
        navigate("/dashboard/payment-history");
      } catch (err) {
        console.log(err);
      }
    }
    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex mt-2 justify-around">
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 cursor-pointer"
          >
            {processing ? (
              <ImSpinner9 className="animate-spin m-auto" size={24} />
            ) : (
              <span disabled={booking?.booked === true}>Book Apartment</span>
            )}
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && (
        <p className="text-red-600 text-xs flex items-center gap-1 mt-0.5">
          <RiErrorWarningFill />
          {cardError}
        </p>
      )}
    </>
  );
};

CheckoutForm.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  totalAmount: PropTypes.number.isRequired,
  refetch: PropTypes.func,
};
export default CheckoutForm;
