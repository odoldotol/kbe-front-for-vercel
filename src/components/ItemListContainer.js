import Item from "./Item.js";
// import nftData from "../data/nftData.json";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";

const Alert = styled.div`
  margin-top: 20rem;
  text-align: center;
`;

function ItemListContainer({ collectionId, opt }) {
  const walletAddr = useSelector((state) => state.walletReducer).walletAddr;
  const [nftList, setNftList] = useState([]);
  let allNftList;

  useEffect(() => {
    // 벡엔드에 요청 전송해서 모든 NFT 정보 받아서 nfts 상태 변경
    const url = "http://localhost:4000/items/nfts/0";
    async function getAllNfts() {
      await axios.get(url).then((res) => {
        allNftList = res.data.data;
        if (opt === undefined) {
          setNftList(allNftList);
        } else if (opt === "createrAccount") {
          let nftData = allNftList.filter((nft) => {
            return nft.creater_account === walletAddr;
          });
          setNftList(nftData);
        } else if (opt === "ownerAccount") {
          let nftData = allNftList.filter((nft) => {
            return nft.owner_account === walletAddr;
          });

          setNftList(nftData);
        }
      });
    }
    getAllNfts();
  }, [opt]);

  return (
    <div className="container">
      {console.log(nftList)}
      <div className="row gy-4 portfolio-container">
        {nftList.length === 0 ? (
          <Alert>검색 결과가 없습니다</Alert>
        ) : (
          nftList.map((nft) => {
            return <Item nft={nft} />;
          })
        )}
      </div>
    </div>
  );
}

export default ItemListContainer;
