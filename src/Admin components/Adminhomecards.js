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
              text='Manage Products'
              path='/admincategorieslist'
            />
            <AdminHomeCardItems
              text='MarketPlace Orders'
              path='/adminmarketplaceorders'
            />
          </ul>
        </div>
        <div className='admin__home__cards__wrapper'>
          <ul className='admin__home__cards__items'>
            <AdminHomeCardItems
              text='Manage Currencies'
              path='/admincurrencies'
            />
          </ul>
        </div>
        <div className='admin__home__cards__wrapper'>
          <ul className='admin__home__cards__items'>
            <AdminHomeCardItems
              text='Manage Investments'
              path='/adminaddinvestments'
            />
            <AdminHomeCardItems
              text='Investment Orders'
              path='/admininvestmentorders'
            />
          </ul>
        </div>
        <div className='admin__home__cards__wrapper'>
          <ul className='admin__home__cards__items'>
            <AdminHomeCardItems
              text='Exchange Orders'
              path='/adminexchangeorders'
            />
          </ul>
        </div>
        <div className='admin__home__cards__wrapper'>
          <ul className='admin__home__cards__items'>
            <AdminHomeCardItems
              text='Customer Recomandations'
              path='/adminrecomandations'
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Adminhomecards
