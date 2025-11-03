import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Quote from './pages/Quote';
import Products from './pages/Products';
import Product from './pages/Product';
import Category from './pages/Category';
import Process from './pages/Process';
import Contact from './pages/Contact';
import Markets from './pages/Markets';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import GDPR from './pages/GDPR';

import ErrorPage from './pages/404';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="quote" element={<Quote />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:category" element={<Category />} />
        <Route path="products/:category/:id" element={<Product />} />
        <Route path="markets" element={<Markets />} />
        <Route path="contact" element={<Contact />} />
        <Route path="process" element={<Process />} />

        <Route path="help" element={<Help />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="GDPR" element={<GDPR />} />

        {/* 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
