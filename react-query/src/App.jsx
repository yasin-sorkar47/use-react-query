import { useState } from "react";
import AddToProduct from "./components/AddToProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  const [getId, setGetId] = useState(null);
  return (
    <div className="flex m-2">
      <AddToProduct />
      <ProductList onGetIt={setGetId} />
      {getId && <ProductDetails id={getId} />}
    </div>
  );
}

export default App;
