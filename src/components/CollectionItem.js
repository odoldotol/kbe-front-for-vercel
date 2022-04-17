import React from "react";
import { Link } from "react-router-dom";
import collectionData from "../data/collectionData.json";

const CollectionItem = ({ collection }) => {
  return (
    <div className="col-lg-4">
      <div className="post-box">
        <div className="post-img">
          <img src={collection.image} className="img-fluid" alt="" />
        </div>
        <span className="post-date">{collection.name}</span>
        <h3 className="post-title">{collection.description}</h3>
        <Link
          to={`/collection/${collection.collectionId}`}
          className="readmore stretched-link mt-auto"
        >
          <span>More</span>
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default CollectionItem;
