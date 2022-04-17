import "./App.css";
import Nav from "./components/Nav.js";
import Mypage from "./pages/Mypage";
import Create from "./pages/Create";
import ExploreCollection from "./pages/ExploreCollection";
import Collection from "./pages/Collection";
import Wallet from "./pages/Wallet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ItemDetail from "./pages/ItemDetail";
import CreateCollection from "./pages/CreateCollection";
import ExploreItem from "./pages/ExploreItem";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setWalletAddr, unsetWalletAddr } from "./modules/walletReducer";

function App() {
  window.addEventListener("scroll", () => {
    // console.log(window.scrollX, window.scrollY);
    if (window.scrollY > 100) {
      document.querySelector("#header").classList.add("header-scrolled");
    } else {
      document.querySelector("#header").classList.remove("header-scrolled");
    }
  });

  const accessToken = useSelector((state) => state.tokenReducer).token;
  const walletAddr = useSelector((state) => state.walletReducer).walletAddr;
  // console.log(`accessToken : 📌️${JSON.stringify(accessToken)}`);
  console.log(`walletAddr : 📌️${JSON.stringify(walletAddr)}`);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      axios({
        method: "post",
        url: "/walletAddr",
        data: {
          accessToken,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => {
        dispatch(setWalletAddr(res.data.walletAddr));
      });
    } else {
      dispatch(unsetWalletAddr());
    }
  }, [accessToken]);

  return (
    <Router>
      <Nav accessToken={accessToken} />
      <Switch>
        <Route exact path="/">
          <ExploreItem />
        </Route>
        <Route exact path="/explorecollection">
          <ExploreCollection />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/createcollection">
          <CreateCollection />
        </Route>
        <Route path="/mypage">
          <Mypage />
        </Route>
        <Route path="/itemdetail/:tokenId" component={ItemDetail} />
        {/* <Route path="/itemdetail/:tokenId">
                            <ItemDetail />
                        </Route> */}
        <Route path="/collection/:collectionId" component={Collection} />
        <Route path="/wallet">
          <Wallet />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
