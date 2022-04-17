import collectionData from "../data/collectionData.json";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Web3 from "web3";
import abi from "../kbNftAbi";
import { useSelector } from "react-redux";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function ItemDetail({ match, location }) {
  const contractAddr = "0x4bf61347473046bd5f119e855f0beb1e3921fd6e";
  const [web3, setWeb3] = useState();
  const [newErc721addr, setNewErc721Addr] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const walletAddr = useSelector((state) => state.walletReducer).walletAddr;
  const buyer_account = walletAddr;

  console.log("location", location);
  const metadata = location.meta;
  const nft = location.nft;
//   const tokenId = match.params.tokenId;

  // 해당 nft가 속한 컬렉션 페이지로 이동하도록 할 때 사용
  // const collection = collectionData.filter((collection) => {
  //     return collection.collectionId === nft.data.collectionId;
  // })[0];

  useEffect(() => {
    // window.ethereum이 있다면
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
        setWeb3(web);
        setNewErc721Addr(contractAddr);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const handleBuy = async (e) => {
    setIsLoading(true);
    // 컨트랙트 연동
    const contract = await new web3.eth.Contract(abi, newErc721addr);
    // mint 함수 실행
    const mintResult = await contract.methods
    .mintNFT(buyer_account, nft.ipfs, nft.creater_account)
    .send({
        from: buyer_account,
        gasLimit: 285000,
        value: (Number(nft.onMarketLog.sale_price) * 1000000000000000000),
    });
    console.log("mint", mintResult);
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("totalSupply", totalSupply);
    
    // 벡엔드로 거래 정보 전달
    const url = "http://localhost:4000/transactions/buy/";
    const payload = {
        "nftId": nft.id,
        "transactionHash": mintResult.transactionHash,
        "buyerAccount": buyer_account,
        "onMarketLogId": nft.onMarketLog.id
    };
    console.log(payload);
    axios.patch(url, payload)
    .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setIsCompleted(true);
    })
};

  return (
    <main id="main">
      {console.log("nft", nft)}
      {console.log("meta", metadata)}
      <section className="breadcrumbs">
        <div className="container">
          <ol>
            <li>
              <Link to="/">Explore</Link>
            </li>
            {/* <li>
                        <Link to={`/collection/${collection.collectionId} `}>
                            {collection.name}
                        </Link>
                    </li> */}
          </ol>
          <h2>{metadata.name}</h2>
        </div>
      </section>
      {isLoading === true ? 
      (<section id="portfolio" className="portfolio">
          <header className="section-header">
            <h2>거래 진행 중</h2>
            <h4>페이지를 이동하지 마세요!</h4>
          </header>
        </section>) 
      : (isCompleted === true ? (<Redirect to="/mypage" />) : (<section id="portfolio-details" className="portfolio-details">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-8">
              <div className="post-img">
                <img src={metadata.image} className="img-fluid" alt="" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row gy-4">
                <div className="portfolio-info">
                  <h3>Information</h3>
                  <ul>
                    {/* <li>
                                        <strong>Collection</strong>:
                                        <Link to={`/collection/${collection.collectionId} `}>
                                            {collection.name}
                                        </Link>
                                    </li> */}
                    <li>
                      <strong>Name</strong>: {metadata.name}
                    </li>
                    {nft.last_price !== null || nft.onMarket !== 0 ? (<li>
                      <strong>Price</strong> :
                    {nft.onMarket === 0 ? (nft.last_price) : (`${String(nft.onMarketLog.sale_price)} ${nft.onMarketLog.sale_token}`)}
                    {/* {`${String(nft.onMarketLog.sale_price)} ${nft.onMarketLog.sale_token}`} */}
                    </li>) : null}
                    <li>
                        {(nft.onMarket === 1 || nft.onMarket === 3) && nft.creater_account !== buyer_account ?  (
                        walletAddr === '' ? (<Link to="/wallet"><button className="btn btn-primary">로그인하러 가기</button></Link>) :
                        (<button className="btn btn-primary" onClick={handleBuy}>
                          Buy now
                        </button>)
                      ) : <p>판매중이 아닙니다.</p>}
                      {/* <button className="btn btn-primary" >Buy now</button> */}
                    </li>
                  </ul>
                </div>
                <div className="portfolio-info">
                  <h3>Description</h3>
                  <p>{metadata.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container contact">
          <header className="section-header">
            <p>Properties</p>
          </header>

          <div className="row">
            <div className="row gy-4">
              {metadata.attributes !== undefined
                ? metadata.attributes.map((trait) => {
                    return (
                      <div className="col-md-6">
                        <div className="info-box">
                          <h3>{trait.type || trait.trait_type}</h3>
                          <h4>{trait.value}</h4>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </section>))}
      
    </main>
  );
}

export default ItemDetail;
