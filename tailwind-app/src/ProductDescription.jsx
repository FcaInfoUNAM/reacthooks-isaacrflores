import React, { useState, useEffect } from 'react';

export default function ProductDescription() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/1')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar el producto');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-4">Cargando producto...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      <img src={product.image} alt={product.title} className="w-full h-64 object-contain mb-4" />
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="font-semibold text-lg">${product.price}</p>
    </div>
  );
}
