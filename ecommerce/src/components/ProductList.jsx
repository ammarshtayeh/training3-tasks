import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="col">
              <div className="card h-100 border-0 shadow-sm placeholder-glow">
                <div className="product-image-wrapper placeholder"></div>
                <div className="card-body">
                  <h5 className="card-title placeholder col-8"></h5>
                  <p className="card-text placeholder col-4"></p>
                  <div className="d-flex gap-2">
                    <span className="btn btn-outline-primary btn-sm flex-grow-1 placeholder"></span>
                    <span className="btn btn-primary btn-sm flex-grow-1 placeholder"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold text-dark">Explore Our Products</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className="card h-100 product-card shadow-sm border-0">
              <div className="product-image-wrapper">
                <img src={product.image} className="card-img-top product-image" alt={product.title} />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate fw-semibold">{product.title}</h5>
                <p className="card-text text-primary fw-bold">${product.price.toFixed(2)}</p>
                <div className="mt-auto d-flex gap-2">
                  <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm flex-grow-1">View Details</Link>
                  <button
                    className="btn btn-primary btn-sm flex-grow-1"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;