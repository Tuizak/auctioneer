import React, { useContext, useState } from 'react';
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/AuthContext';
import PayPalCheckout from '../paypalCheckout';

const renderer = ({ days, hours, minutes, seconds, completed, setShowPayment, item, owner, bidAuction, endAuction }) => {
  if (completed) {
    console.log('Countdown completed');
    return null;
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <div
          style={{
            height: '320px',
            backgroundImage: `url(${item.imgUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="w-100"
        />

        <div className="card-body">
          <p className="lead display-6">{item.title}</p>
          <div className="d-flex justify-content-between align-items-center">
            <h5>
              {hours} hr: {minutes} min: {seconds} sec
            </h5>
          </div>
          <p className="card-text">{item.desc}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {!owner ? (
                <div
                  onClick={() => {
                    console.log('Bid action');
                    bidAuction();
                  }}
                  className="btn btn-outline-secondary"
                >
                  Apostar
                </div>
              ) : owner.email === item.email ? (
                <div
                  onClick={() => {
                    console.log('End auction action');
                    endAuction(item.id);
                  }}
                  className="btn btn-outline-secondary"
                >
                  Cancelar
                </div>
              ) : owner.email === item.curWinner ? (
                <div
                  onClick={() => {
                    console.log('Set showPayment to true');
                    setShowPayment(true);
                  }}
                  className="btn btn-outline-secondary"
                >
                  Pagar
                </div>
              ) : (
                <div
                  onClick={() => {
                    console.log('Bid action with id and price');
                    bidAuction(item.id, item.curPrice);
                  }}
                  className="btn btn-outline-secondary"
                >
                  Ofertar
                </div>
              )}
            </div>
            <p className="display-6">${item.curPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuctionCard = ({ item }) => {
  const expiredDate = new Date(item.duration);
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);
  const [showPayment, setShowPayment] = useState(false);

  const handlePaymentSuccess = (orderID) => {
    console.log('Payment successful with Order ID:', orderID);
    setShowPayment(false);
  };

  return (
    <>
      {showPayment ? (
        <PayPalCheckout amount={item.curPrice} onSuccess={handlePaymentSuccess} />
      ) : (
        <Countdown
          owner={currentUser}
          date={expiredDate}
          bidAuction={bidAuction}
          endAuction={endAuction}
          item={item}
          renderer={(props) => renderer({ ...props, setShowPayment, item, owner: currentUser, bidAuction, endAuction })}
        />
      )}
    </>
  );
};