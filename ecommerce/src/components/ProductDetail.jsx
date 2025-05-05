import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <div className="product-image-wrapper placeholder-glow">
              <div className="product-image placeholder"></div>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="placeholder col-8"></h2>
            <p className="placeholder col-12"></p>
            <p className="placeholder col-4"></p>
            <span className="btn btn-primary placeholder"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="product-image-wrapper bg-light rounded-3 shadow-sm">
            <img src={product.image} alt={product.title} className="product-image img-fluid" />
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">{product.title}</h1>
          <p className="text-muted mb-4">{product.description}</p>
          <h3 className="text-primary fw-bold mb-4">${product.price.toFixed(2)}</h3>
          <div className="d-flex gap-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                addToCart(product);
                navigate('/cart');
              }}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-outline-primary btn-lg">View Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;