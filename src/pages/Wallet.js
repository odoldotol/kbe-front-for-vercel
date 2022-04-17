import React, { memo } from "react";
import { setToken } from "../modules/tokenReducer";
import WalletItem from "../components/WalletItem";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Wallet = memo(() => {
  const accessToken = useSelector((state) => state.tokenReducer).token;

  return (
    <>
      <section id="features" className="features">
        <div className="container">
          <header className="section-header">
            <h2>Features</h2>
            <p>Connect Your Wallet</p>
          </header>

          <div className="row">
            <div className="col-lg-6">
              <img src="assets/img/features.png" className="img-fluid" alt="" />
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0 d-flex">
              <div className="row align-self-center gy-4">
                <WalletItem disabled={false} setAccessToken={setToken}>
                  MetaMask
                </WalletItem>
                <WalletItem disabled={true}>Coinbase Wallet</WalletItem>
                <WalletItem disabled={true}>WalletConnect</WalletItem>
                <WalletItem disabled={true}>Phantom</WalletItem>
              </div>
            </div>
          </div>
        </div>
      </section>
      {accessToken !== "" && <Redirect to="/" />}
    </>
  );
});

export default Wallet;
