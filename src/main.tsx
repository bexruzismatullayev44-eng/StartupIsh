
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "rodal/lib/rodal.css";
// import { BrowserRouter } from 'react-router-dom';

// createRoot(document.getElementById('root')!).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// )


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "rodal/lib/rodal.css";
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './Providers/CartProvider'; // 👈 qo‘sh

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CartProvider>   {/* 👈 SHU YERGA */}
      <App />
    </CartProvider>
  </BrowserRouter>,
)