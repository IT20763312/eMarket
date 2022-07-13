import React from 'react'
import './Adminhomecards.css';
import AdminHomeCardItems from './Adminhomecarditems';

function Adminhomecards() {
  return (
    <div className='admin__home__cards'>
      <div className='admin__home__cards__container'>
        <div className='admin__home__cards__wrapper'>
          <ul className='admin__home__cards__items'>
            <AdminHomeCardItems
              text='Manage Item Categories'
              path='/admincategories'
            />
            <AdminHomeCardItems
              text='Add Products'
              path='/adminaddproducts'
            />
            <AdminHomeCardItems
              text='Manage Currencies'
              path='/admincurrencies'
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Adminhomecards
