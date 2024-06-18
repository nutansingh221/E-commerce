import { useState } from 'react';
import Rating from './Rating';

function ProdCard(props){

    const [notification, setNotification] = useState('');

    const addToCart = async () => {
        try {
          const response = await fetch('http://localhost:5000/addToCart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: props.product.ID, quantity: 1 }),  // Sending id and quantity
          });
          const data = await response.json();
          if (response.ok) {
            console.log('Product added to cart:', data);
            setNotification('Product added to cart!');
            setTimeout(() => {
              setNotification('');
            }, 1500);
          } else {
            console.error('Error adding product to cart:', data.error);
            setNotification(`Error: ${data.error}`);
          }
        } catch (error) {
          console.error('Error:', error);
          setNotification(`Error: ${error.message}`);
        }
      };


    return(
        <div className="shadow-md rounded-xl m-5 p-5 flex flex-col justify-between items-start">
            <div className='flex justify-center items-center w-full'>
                <img src={props.product.Image} className='max-h-60' />
            </div>
            <div className='flex flex-col justify-between gap-5'>
                <div className='grid gap-2'>
                    <p>{props.product.Title}</p>
                    <h4>{props.product.Price} $</h4>
                    <Rating rating={Math.floor(props.product.Rating)} />    
                </div>
                <button className="rounded-full bg-teal-600 py-1 px-5 text-white hover:bg-teal-700 cursor-pointer font-medium w-fit"
                onClick={addToCart}
                >Add to cart</button>
                {notification && (
                    <div className="mt-2 text-teal-600 absolute bg-gray-700 p-2 rounded-full">
                    {notification}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProdCard;