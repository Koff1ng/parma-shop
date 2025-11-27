import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { db } from "./firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useCart } from "./CartContext";
import Checkout from "./Checkout";
import PRODUCTS from "./data/products";
import "./App.css";
import Hero from "./components/Hero";
import { useEffect } from "react";
import AdminLogin from "./AdminLogin";
import Dashboard from "./dashboard";

function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setProducts(data);
    });

    return () => unsub();
  }, []);

  return (
    <>
      {/* 🔥 PORTADA HERO */}
      <Hero />

      {/* 🔥 SECCIÓN DE PRODUCTOS */}
      <h2
        id="products"
        className="section-title"
        style={{ marginTop: "80px", textAlign: "center", color: "white" }}
      >
        NUEVOS LANZAMIENTOS
      </h2>

      <div className="products">
        {products.length === 0 && (
          <p style={{ color: "white", textAlign: "center" }}>
            No hay productos. Agrega uno en el panel admin.
          </p>
        )}

        {products.map((p) => (
          <div key={p.id} className="product">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>${p.price?.toLocaleString("es-CO")}</p>
            <button onClick={() => addToCart(p)}>Añadir al carrito</button>
          </div>
        ))}
      </div>
    </>
  );
}


export default function App() {
  
  const { cart, addToCart, removeFromCart, total } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
      setShowNav(true);
      return;
    }

    if (currentScroll > lastScroll) {
      // usuario bajando → ocultar navbar
      setShowNav(false);
    } else {
      // usuario subiendo → mostrar navbar
      setShowNav(true);
    }

    setLastScroll(currentScroll);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScroll]);
   useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/* ✅ NAVBAR */}
      <header className={`navbar ${showNav ? "nav-visible" : "nav-hidden"}`}>
  <Link to="/" className="logo">PARMA ITALIA</Link>

  {/* 🔥 MENÚ SUPERIOR */}
<nav className="top-menu">
  <a href="#new">NUEVOS LANZAMIENTOS</a>
  <a href="#men">MEN</a>
  <a href="#women">WOMEN</a>
  <a href="#black">BLACK FRIDAY</a>
</nav>


  {/* 🔥 CARRITO */}
  <button className="cart-icon" onClick={() => setOpenCart(true)}>
    🛒 {cart.length > 0 && <span className="badge">{cart.length}</span>}
  </button>
</header>


      {/* ✅ SLIDE-IN CART / SHOPIFY STYLE */}
      <aside className={`side-cart ${openCart ? "open" : ""}`}>
        <button className="close" onClick={() => setOpenCart(false)}>✖</button>

        <h3>Tu carrito</h3>

        {cart.length === 0 && <p>Carrito vacío 🛒</p>}

        {cart.map((item) => (
          <div key={item.id} className="cart-row">
            <img src={item.thumb} alt={item.name} />

            <div className="info">
              <span>{item.name}</span>
              <span>${item.price.toLocaleString("es-CO")}</span>
            </div>

            <div className="controls">
              <button onClick={() => removeFromCart(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => addToCart(item)}>+</button>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <div className="side-total">
              Total: ${total.toLocaleString("es-CO")}
            </div>

            <Link
              to="/checkout"
              className="checkout-link"
              onClick={() => setOpenCart(false)}
            >
              Finalizar compra ✅
            </Link>
          </>
        )}
      </aside>

      {/* ✅ ROUTING */}
      {/* ROUTING */}
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/admin" element={<AdminLogin />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>


    </>
  );
}
