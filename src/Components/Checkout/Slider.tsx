import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../Redux/hooks';
import CheckoutStyle from'./Checkout.module.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function Slider() {
    const[items,setItems]=useState<any>([]);
    const cart  = useAppSelector((state) => state.cart);
    let cartItems = cart.cartItems;
    const handleDragStart = (e:any) => e.preventDefault();
    useEffect(()=>{
        const element = document.getElementsByClassName('alice-carousel__prev-btn-item')[0] as HTMLElement;
        element.style.display = 'none';
        const element2 = document.getElementsByClassName('alice-carousel__next-btn-item')[0] as HTMLElement;
        element2.style.display = 'none';
        let arr:any[]=[];
            cartItems?.forEach((element: { imageUrl: string }) => {
                arr.push(
                    <div className={CheckoutStyle.imgdiv}>
                        <img
                            className={CheckoutStyle.prdimg}
                            src={element.imageUrl}
                            onDragStart={handleDragStart}
                            role="presentation"
                            alt=""
                        />
                    </div>
                );
            });
        setItems([...arr]);
    },[]);
    return (
        <AliceCarousel
            mouseTracking
            items={items}
            autoPlayControls={false}
            keyboardNavigation={true}
        />
    )
}

export default Slider;