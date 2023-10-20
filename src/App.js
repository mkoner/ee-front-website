import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";

import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import ProductCard from './components/productCard/productCard';
import CheckOutPage from "./pages/checkOutPage/checkOutPage";
import CollectionPage from "./pages/collectionPage/collectionPage";
import ShopPage from "./pages/shopPage/shopPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/collections/:id" element={<CollectionPage />} />
          <Route path="/articles" element={<ShopPage />} />
          <Route path="/checkout" element={<CheckOutPage/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}
export default App;
