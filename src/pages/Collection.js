import ItemListContainer from "../components/ItemListContainer";
import collectionData from "../data/collectionData.json";

function Collection({ match }) {
  const collectionId = match?.params?.collectionId;
  const collection = collectionData.filter((el) => {
    return Number(el.collectionId) === Number(collectionId);
  })[0];

  return (
    <section id="portfolio" className="portfolio">
      <header className="section-header">
        <h2>Collection</h2>
        <p>{collection.name}</p>
      </header>
      <ItemListContainer collectionId={collectionId} />
    </section>
  );
}

export default Collection;
