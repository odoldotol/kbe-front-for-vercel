import React, { memo, useState } from "react";
import "./Create.css";
import collectionData from "../data/collectionData.json";
import { Link } from "react-router-dom";
import { NFTStorage } from "nft.storage";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Create = memo(() => {
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMwMTZmNmFlN2JiMkI1MDlDNzAwMzBjREEzQjE2QTJmYTFlZDczZDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0OTc0ODUwMzg2OCwibmFtZSI6InByb2plY3QifQ.kTECTr_5hc9tETAtSB6lZ6IFu6No_glSWt1ensgOObE";
  const client = new NFTStorage({ token: apiKey });
  const [inputs, setInputs] = useState({
    name: "",
    desc: "",
  });
  const [file, setFile] = useState();
  const [price, setPrice] = useState();
  const [properties, setProperties] = useState([{ type: "", value: "" }]);
  const [metadata, setMetadata] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const accessToken = useSelector((state) => state.tokenReducer).token;
  const walletAddr = useSelector((state) => state.walletReducer).walletAddr;

  // 파일 선택 시 state 변경
  const handleFileInput = (e) => {
    // console.log("onchange");
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  // NFT 이름, Description 입력
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // Price 입력
  const handlePrice = (e) => {
    console.log(typeof e.target.value);
    if (e.target.value.includes("-")) {
      e.target.value = "";
      alert("알맞은 값을 입력해주세요");
    } else {
      setPrice(e.target.value);
    }
  };

  // Property type, value 입력
  const handleProperty = (e) => {
    const { name, value, id } = e.target;
    const newArr = [...properties];
    newArr[id][name] = value;
    setProperties(newArr);
  };

  // Property 항목 추가 버튼 클릭
  const addProperty = () => {
    setProperties([...properties, { type: "", value: "" }]);
  };

  // Property 항목 삭제 버튼 클릭 (가장 마지막 항목 삭제)
  const delProperty = () => {
    setProperties(properties.slice(0, properties.length - 1));
  };

  // 업로드 버튼 클릭 (메타데이터 업로드 및 벡엔드로 create 요청 전송)
  const handleSubmit = async (e) => {
    // 필수항목 입력 여부 체크 후 메타데이터 생성
    if (inputs.name === "") {
      alert("Name을 입력해주세요");
    } else if (inputs.desc === "") {
      alert("Description을 입력해주세요");
    } else if (file === undefined) {
      alert("Image 파일을 선택해주세요");
    } else if (price === undefined || price === "") {
      alert("가격을 입력해주세요");
    } else {
      setIsLoading(true);
      // state 이용해서 메타데이터 생성
      let data = {
        name: inputs.name,
        description: inputs.desc,
        image: file,
      };
      if (properties.length !== 0 && properties[0]["type"] !== "") {
        data["attributes"] = properties;
      }

      await client.store(data).then((metadata) => {
        setMetadata(metadata.url);
        setIsLoading(false);

        // 벡엔드로 요청 전송
        const url = "http://localhost:4000/items/nfts/mint/";
        const payload = {
          ipfs: "http://ipfs.io/ipfs/" + String(metadata.url).split("//")[1],
          price: Number(price),
          account: walletAddr,
          collectionId: null,
          saleToken: null,
        };
        axios.post(url, payload).then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("생성 완료");
            setIsCompleted(true);
          }
        });
      });
    }
  };

  return (
    <section id="contact" className="contact">
      {isCompleted === true ? (
        <section id="portfolio" className="portfolio">
          <header className="section-header">
            <h2>메타데이터 업로드 완료!</h2>
            <a
              href={"http://ipfs.io/ipfs/" + String(metadata).split("//")[1]}
              target="_blank"
            >
              {"http://ipfs.io/ipfs/" + String(metadata).split("//")[1]}
            </a>
          </header>
        </section>
      ) : isLoading === false && isCompleted === false ? (
        <div div className="container">
          <header className="section-header">
            <p>Create New Item</p>
          </header>
          <div className="row php-email-form">
            <form className="php-email-form">
              <div className="row gy-4">
                <div className="col-md-12">
                  <h4 align="left">Image, Video, Audio, or 3D Model</h4>
                  <input
                    type="file"
                    id="upload"
                    className="form-control"
                    onChange={handleFileInput}
                  />
                </div>
                <div className="col-md-12">
                  <h4 align="left">Name</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Item name"
                    required
                    onChange={handleInputs}
                  />
                </div>
                <div className="col-md-12">
                  <h4 align="left">Description</h4>
                  <textarea
                    className="form-control"
                    name="desc"
                    rows="6"
                    placeholder="Provide a detail description of your item"
                    required
                    onChange={handleInputs}
                  ></textarea>
                </div>
                <div className="col-md-12">
                  <h4 align="left">Price</h4>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="단위: ETH"
                    min="0"
                    step="0.01"
                    onChange={handlePrice}
                  />
                </div>
                <div className="col-md-12">
                  <h4 align="left">Properties</h4>
                  <div className="row gy-4" id="properties_container">
                    {properties.map((el, index) => {
                      return (
                        <>
                          <div className="col-md-6 property1">
                            <input
                              type="text"
                              name="type"
                              id={index}
                              className="form-control"
                              placeholder="type"
                              onChange={handleProperty}
                            />
                          </div>
                          <div className="col-md-6 property1">
                            <input
                              type="text"
                              name="value"
                              id={index}
                              className="form-control"
                              placeholder="value"
                              onChange={handleProperty}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={addProperty}
                  >
                    <i class="bi bi-plus" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={delProperty}
                  >
                    삭제
                  </button>
                </div>

                <div className="col-md-12">
                  <h4 align="left">Collection</h4>
                  <select className="form-control" disabled>
                    <option value="">Select Collection</option>
                    {collectionData.map((collection) => {
                      return (
                        <option value={collection.collectionId}>
                          {collection.name}
                        </option>
                      );
                    })}
                  </select>
                  <Link to="/createcollection">
                    <p> You can manage your collections here.</p>
                  </Link>
                </div>
                <div className="col-md-12 text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    업로드
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <section id="portfolio" className="portfolio">
          <header className="section-header">
            <h2>메타데이터 업로드 하는 중</h2>
            <h4>페이지를 이동하지 마세요!</h4>
          </header>
        </section>
      )}
      {accessToken == "" && <Redirect to="/wallet" />}
    </section>
  );
});

export default Create;
