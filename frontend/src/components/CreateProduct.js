import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
        data: {
            name:Name,
            price:Price
          }
        };

    const jwt=localStorage.getItem('token');
    // console.log(jwt)

    await fetch('http://localhost:1337/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}` // Replace with the actual API token
      },
      body: JSON.stringify(productData)
    })
    .then(data => {
      if(data.status !== 200){
        console.log(data.status);
        setError("This User not Authorized for Create Product")
        
      }else{
        console.log(data)
        setError('Successfully created')
        setName('');
        setPrice('')
        navigate('/')
      }
        
      // Handle successful creation, such as displaying a success message or redirecting to another page
    })
    .catch(error => {
      console.error('Error creating product:', error);
      setError("This User not Authorized for Create Product");
      // Handle error, such as displaying an error message
    });

    // Clear the form after submission
    };
  return (
    <>
      <div className='card'>
        <div className='card-header bg-secondary text-white'>
          <p className='h4'> Create Product</p>
        </div>
        <div className='card-body bg-light'>
          <p className='h4 text-danger'>{error}</p>
          <form onSubmit={handleSubmit}>
          <div className='form-group mt-3'>
            <label>Name:</label>
            <input type="text" value={Name} onChange={handleNameChange} />
          </div>
          <div className='form-group mt-3'>
            <label>Price:</label>
            <input type="text" value={Price} onChange={handlePriceChange} />
          </div>
          <button className='btn btn-secondary btn-sm mt-3' type="submit">Create</button>
        </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
