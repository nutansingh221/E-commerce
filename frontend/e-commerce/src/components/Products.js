import React, { useState, useEffect } from 'react';
import ProdCard from './ProdCard';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/getProducts')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProducts(data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching the products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-4 gap-10'>
      {products.length > 0 ? (
        products.map((product) => (
            <ProdCard product={product} key={product.ID} />
        ))
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
}

export default Products;