import React from 'react';
import './Cards.css';
import CardItem from './Carditem';

function Cards() {
  return (
    <div className='cards'>
      <h1 className='cards__h1'>“As cryptocurrency becomes more widespread, we'll have a world where money is easy to access"</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='Card Images/LetterM.png'
              text='Easy to buy!'
              label='MarketPlace'
              path='/marketplace'
            />
            <CardItem
              src='Card Images/LetterE.png'
              text='Easy to exchange!'
              label='Exchanges'
              path='/exchanges'
            />
            <CardItem
              src='Card Images/LetterI.png'
              text='Easy to invest!'
              label='Investments'
              path='/investments'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;