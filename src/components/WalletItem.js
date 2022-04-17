import React, { memo, useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { useDispatch } from "react-redux";

const WalletItem = memo(({ children, setAccessToken, disabled }) => {
  const [web3, setWeb3] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
        console.log(`📌️web3 연결`);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    axios({
      method: "post",
      url: "/login",
      data: {
        account: accounts[0],
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      dispatch(setAccessToken(res.data.accessToken));
    });
  };

  const popUp = () => {
    alert("준비 중입니다");
  };

  return (
    <div className="col-md-6">
      <a
        onClick={() => {
          disabled ? popUp() : connectWallet();
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="feature-box d-flex align-items-center">
          <i className="bi bi-wallet"></i>
          <h3>{children}</h3>
        </div>
      </a>
    </div>
  );
});

export default WalletItem;
