import ItemListContainer from '../components/ItemListContainer';

const ExploreItem = () => {
    return (
        <section id="portfolio" className="portfolio">
          <header className="section-header">
            <h2>Explore</h2>
            <p>All NFTs</p>
          </header>
          <ItemListContainer collectionId="0" />
        </section>
      );
}

export default ExploreItem;