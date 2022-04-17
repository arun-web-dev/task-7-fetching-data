import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./DeliveryDetails.scss";
class DeliveryDetails extends Component {
  state = {
    coupounIsActive: false,
    message: "",
    messageIsActive: false,
    coupounValue: 0,
    coupounCode: "",
    finalCoupounValue: 0,
    formCompleted: true,
    coupounApplied: false,
  };

  messageHandler(message) {
    this.setState({
      message,
      messageIsActive: true,
    });

    setTimeout(() => {
      this.props.navigate("/");
    }, 2000);
  }

  submitCoupounHandler = (e) => {
    e.preventDefault();
    const { coupounCode, coupounIsActive } = this.state;

    if (coupounCode.toLowerCase() === "free") {
      this.setState({
        coupounValue: 5,
      });
      this.setState({
        messageIsActive: true,
        message: "Coupoun Applied",
        coupounIsActive: !coupounIsActive,
        coupounApplied: true,
      });
      setTimeout(() => {
        this.setState({
          messageIsActive: false,
        });
      }, 500);
    }
  };

  deliverySubmitHandler(e) {
    e.preventDefault();
    console.log("form submiited");
  }

  render() {
    const {
      coupounIsActive,
      message,
      messageIsActive,
      coupounValue,
      formCompleted,
      coupounApplied,
    } = this.state;
    const { total } = this.props.location.state;
    const { navigate } = this.props;

    return (
      <div className="flex deliver-details-container center">
        <div className=" shadow-1 mt2  pa3 delivery-address-container">
          <h2 className="tc w--100">Delivery Address</h2>
          <div className="form-container">
            <form
              className="flex flex-column justify-center form-container-form"
              onSubmit={this.deliverySubmitHandler}
            >
              <div className="flex justify-between mt3">
                <div>
                  <label htmlFor="name">Name</label>
                  <div>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      className="pa1 mt1"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phoneNumber">10-digit mobile number</label>
                  <div>
                    <input
                      required
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="pa1 mt1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt3">
                <div>
                  <label htmlFor="pincode">Pincode</label>
                  <div>
                    <input
                      required
                      type="text"
                      name="pincode"
                      id="pincode"
                      className="pa1 mt1"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="locality">Locality</label>
                  <div>
                    <input
                      required
                      type="text"
                      id="locality"
                      name="locality"
                      className="pa1 mt1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-column justify-between mt3">
                <label htmlFor="address">Adress(Area and street) </label>
                <div className="w-100">
                  <textarea
                    className="w--100 delivery-textarea pa1 mt1"
                    name="address"
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-between mt3">
                <div>
                  <label htmlFor="city">City/District/Town</label>
                  <div>
                    <input
                      required
                      type="text"
                      name="city"
                      id="city"
                      className="pa1 mt1"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="state">State</label>
                  <div>
                    <input
                      required
                      type="text"
                      id="state"
                      name="state"
                      className="pa1 mt1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt3">
                <div>
                  <label htmlFor="city">Landmark</label>
                  <div>
                    <input
                      required
                      type="text"
                      name="city"
                      id="city"
                      className="pa1 mt1"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="state">Alternate Phone number</label>
                  <div>
                    <input
                      required
                      type="text"
                      id="state"
                      name="state"
                      className="pa1 mt1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center mt3">
                  <label htmlFor="city">Cash on delivery</label>
                  <div>
                    <input
                      type="radio"
                      name=""
                      id=""
                      checked
                      readOnly
                      className="ml2"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="place-order-container-content-right pa3  shadow-1 mt2  ml2">
          <div className="flex flex-column justify-between">
            <label className="f3 b">PRICE DETAILS</label>
            <div className="flex justify-between mt3">
              <p>Price items </p>
              <p>Rs.{total}</p>
            </div>

            <div className="flex justify-between mt3">
              <p>
                Coupoun Discounts{" "}
                <span
                  className="underline pointer"
                  onClick={() => {
                    this.setState({ coupounIsActive: !coupounIsActive });
                  }}
                >
                  {" "}
                  Do you have coupons ?
                </span>
              </p>
              <p className="price-details">Rs.-{coupounValue}</p>
            </div>
            {coupounApplied && (
              <div className="f4 mt2 b">(Coupoun Applied)</div>
            )}

            {coupounIsActive && (
              <div className="flex flex-column mt3">
                <label htmlFor="coupoun" className="f6">
                  If have coupons enter details below
                </label>
                <div>
                  <form onSubmit={this.submitCoupounHandler}>
                    <input
                      required
                      type="text"
                      className="pa1"
                      onChange={(e) =>
                        this.setState({ coupounCode: e.target.value })
                      }
                    />
                  </form>
                </div>
              </div>
            )}
            <div className="flex justify-between mt3">
              <p>Delivery Charges</p>
              <p className="price-details">FREE</p>
            </div>
            <div className="flex justify-between mt3">
              <h2>Total amount</h2>
              <h2>Rs.{total - coupounValue}</h2>
            </div>
            <div className="mt2 price-details">
              Your Additional Saving on this order Rs.{coupounValue}
            </div>
          </div>
          <div className="flex">
            {formCompleted ? (
              <button
                className="place-order-btn delivery"
                onClick={() =>
                  this.messageHandler("Order Submitted Successfully :)")
                }
              >
                CONFIRM ORDER
              </button>
            ) : (
              <button className="place-order-btn disabled delivery" disabled>
                CONFIRM ORDER
              </button>
            )}

            <button
              className="place-order-btn delivery-cancel dib ml2 "
              onClick={() => navigate("/placeOrder")}
            >
              CANCEL
            </button>
          </div>
        </div>
        {messageIsActive && (
          <div className="order-submitted-message active">{message}</div>
        )}
      </div>
    );
  }
}

export default function (props) {
  const location = useLocation();
  const navigate = useNavigate();
  return <DeliveryDetails {...props} location={location} navigate={navigate} />;
}
