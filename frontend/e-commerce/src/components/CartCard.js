import { useEffect, useState } from "react";

function CartCard(props){

    const initialQty = props.product.Quantity;
    const initialAmount = props.product.Amount;
    const [qty, setQty] = useState(initialQty);
    const [amount, setAmount] = useState(initialAmount.toFixed(2))

    useEffect(()=>{
        if(qty == 0){
            const remove = async () => {
                try {
                    const response = await fetch('http://localhost:5000/deleteFromCart', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ id: props.product.ID }),  // Sending id and quantity
                    });
                    const data = await response.json();
                    if (response.ok) {
                      console.log('Product removed to cart:', data);
                      props.removeProduct(props.product.ID);
                    } else {
                      console.error('Error removing product from cart:', data.error);
                    }
                  } catch (error) {
                    console.error('Error:', error);
                  }
            };
            remove();
        }
        setAmount((props.product.Price * qty).toFixed(2));
    },[qty])

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
            setQty(prevQty => prevQty + 1);
            props.updateTotal(props.product.Price)
          } else {
            console.error('Error adding product to cart:', data.error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const removeFromCart = async() => {
        try {
            const response = await fetch('http://localhost:5000/deleteFromCart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: props.product.ID, quantity: 1 }),  // Sending id and quantity
            });
            const data = await response.json();
            if (response.ok) {
              console.log('Product removed to cart:', data);
              setQty(prevQty => prevQty - 1);
              props.updateTotal(-props.product.Price)
            } else {
              console.error('Error removing product from cart:', data.error);
            }
          } catch (error) {
            console.error('Error:', error);
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
                    <div className="flex gap-2 items-center">
                        <button className="rounded-full bg-teal-600 py-1 px-5 text-white hover:bg-teal-700 cursor-pointer font-medium w-fit"
                        onClick={removeFromCart}
                        >-</button>
                        <h4>{qty}</h4>
                        <button className="rounded-full bg-teal-600 py-1 px-5 text-white hover:bg-teal-700 cursor-pointer font-medium w-fit"
                        onClick={addToCart}
                        >+</button>
                    </div>
                    <h4>Amount : {amount} $</h4>
                </div>
            </div>
        </div>
    )
}

export default CartCard;