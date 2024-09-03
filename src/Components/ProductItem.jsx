import React from 'react'
import './ProductItem.css'
import Popup from 'reactjs-popup'
export default function ProductItem({item}) {
    return (
        <div className='prod-item-container'>
            
            <p className="prod-name">{item["productName"]}</p>
        </div>
    )
}
