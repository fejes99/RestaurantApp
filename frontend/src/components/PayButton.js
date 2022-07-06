import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const PayButton = ({ order }) => {
  const handleCheckout = () => {
    console.log(order);
    axios
      .post(`/payments/create-checkout-session`, {
        order,
        user: order.user.id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Button onClick={() => handleCheckout()}>PAY WITH STRIPE</Button>
    </>
  );
};

export default PayButton;
