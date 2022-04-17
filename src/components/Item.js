import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Item({ nft }) {
  const [meta, setMeta] = useState({});

  // console.log(nft);

  // ipfs 링크로 메타데이터 받아서 state로 저장
  useEffect(() => {
    // 벡엔드에 요청 전송해서 모든 NFT 정보 받아서 nfts 상태 변경
    async function getMetadata() {
      await axios.get(nft.ipfs).then((res) => {
        // console.log(res.data);
        let data = res.data;
        if (data.image.startsWith("ipfs://")) {
          data.image =
            "http://ipfs.io/ipfs/" + String(data.image).split("//")[1];
        }
        setMeta(data);
      });
    }
    getMetadata();
  }, []);

  return (
    <div class="col-lg-4 col-md-6 portfolio-item filter-app">
      {/* {console.log(meta)} */}
      <div class="portfolio-wrap">
        <img src={meta.image} class="img-fluid" alt="" />
        <div class="portfolio-info">
          <h4>{meta.name}</h4>
          <p>{nft.price}</p>
          <div class="portfolio-links">
            <a
              href={meta.image}
              data-gallery="portfolioGallery"
              class="portfokio-lightbox"
              title="App 1"
            >
              <i class="bi bi-plus"></i>
            </a>
            <Link
              to={{
                pathname: `/itemdetail/${String(nft.id)}`,
                meta: meta,
                nft: nft,
              }}
            >
              <a title="More Details" href="">
                <i class="bi bi-link"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
