import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState(DEFAULT_INVENTORY);

  useEffect(()=>{
    async function load(){
      try{
        const res=await window.storage.get("eotd-inventory");
        if(res&&res.value) setInventory(JSON.parse(res.value));
      }catch(e){}
    }
    load();
  },[]);

  const showNav = page !== "admin";

  return (
    <div style={{fontFamily:"'Space Grotesk','Inter',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} input,select{font-family:'Space Grotesk','Inter',sans-serif;} input::placeholder{color:#444;} input:focus,select:focus{outline:none;}`}</style>
      {showNav && <Nav page={page} setPage={setPage} cart={cart}/>}
      {page==="home"     && <HomePage     setPage={setPage} inventory={inventory}/>}
      {page==="shop"     && <ShopPage     setPage={setPage} inventory={inventory} cart={cart} setCart={setCart}/>}
      {page==="checkout" && <CheckoutPage setPage={setPage} cart={cart} setCart={setCart}/>}
      {page==="admin"    && <AdminPage    setPage={setPage} inventory={inventory} setInventory={setInventory}/>}
    </div>
  );
}
