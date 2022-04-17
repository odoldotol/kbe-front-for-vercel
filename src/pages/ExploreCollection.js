import React from "react";
import CollectionItem from "../components/CollectionItem";
import collectionData from "../data/collectionData.json";

const ExploreCollection = () => {
  return (
    <section id="recent-blog-posts" className="recent-blog-posts">
      <div className="container">
        <header className="section-header">
          <p>Explore Collection</p>
        </header>
        <div className="row">
          {collectionData.map((el) => (
            <CollectionItem key={el.collectionId} collection={el} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCollection;
