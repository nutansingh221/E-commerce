import React, { useState, useEffect } from 'react';
import CartCard from './CartCard';

function CartProd() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getCart')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProducts(data[0]);
        setCartValue(data[1])
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching the products:', error);
        setLoading(false);
      });
  }, []);

  const removeProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.ID !== productId));
  };
  const updateTotal = (price) => {
    setCartValue(prevTotal => (prevTotal + price))
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='flex gap-5 my-10 mx-10'>
        <h3>Total Cart value : {cartValue.toFixed(2)}</h3>
        <a className="rounded-full bg-teal-600 py-1 px-5 text-white hover:bg-teal-700 cursor-pointer font-medium w-fit"
        href='/CheckOut'
        >Continue to Checkout</a>
      </div>
      <div className='grid grid-cols-4 gap-10'>
        {products.length > 0 ? (
          products.map((product) => (
              <CartCard key={product.ID} product={product} removeProduct={removeProduct} updateTotal={updateTotal} />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
}

export default CartProd;