import List_produit from "./list_produit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav_bar from "./nav_bar";
import Panier from "./Panier";
import Login from "./login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav_bar/>
      <Routes>
          <Route index element={<List_produit/>} />
          <Route path="/panier" element={<Panier/>} />
          <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
