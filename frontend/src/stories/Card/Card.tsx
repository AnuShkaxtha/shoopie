// Card.tsx

import React from 'react';
import { Button } from '../Button/Button';

export interface CardProps {
    brand: string;
  title: string;
  price: number;
  description: string;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

export const Card: React.FC<CardProps> = ({ title,description,brand,price,  onMouseOver, onMouseOut }) => {
  return (
    <div
    style={{ width: "250px", paddingLeft: 22, border: "1px solid black",padding:20, borderRadius:20}}
     
    >
        <img src='https://as2.ftcdn.net/v2/jpg/07/51/15/25/1000_F_751152532_WavovTFJoTQM2ct3xU79te4xmhkYcl7N.jpg' alt='image' style={{width:"250px"}}  onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}/>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div>
            <Button label={'+'}/>
            <Button label={'-'}/>
            </div>
        
        <Button label={'Add to cart'}/>
        </div>
        
        <h2>{brand}</h2>
      <h3 style={{fontSize:"17px",}}>{title}</h3>
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
};
export default Card;
