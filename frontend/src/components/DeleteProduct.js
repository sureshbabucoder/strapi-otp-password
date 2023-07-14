import React from 'react';

const DeleteProduct = ({ productId, onDelete,onError }) => {
    const handleDelete = async() => {
        const jwt=localStorage.getItem('token');
        await fetch(`http://localhost:1337/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}` 
            }
        })
        .then(response => {
          if (response.ok) {
            // Successful deletion
            onDelete(productId);
            onError('Successful deletion')
          } else {
            // Handle error response
            throw new Error('Error deleting product');
          }
        })
        .catch(error => {
          onError("This User is not authorized to delete this product");
        });
    }

  return (
    <button onClick={handleDelete} className=' btn btn-danger btn-sm text-white'>Delete</button>
  );
};

export default DeleteProduct;