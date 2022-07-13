import React from 'react'
import { Link } from 'react-router-dom';

function Adminhomecarditems(props) {
  return (
    <>
      <li className='admin__home__cards__item'>
        <Link className='admin__home__cards__item__link' to={props.path}>
          <div className='admin__home__cards__item__info'>
            <h5 className='admin__home__cards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  )
}

export default Adminhomecarditems
