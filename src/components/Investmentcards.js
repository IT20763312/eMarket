import React from 'react';
import './Investmentcards.css';
import { useNavigate, Link } from 'react-router-dom';

function Investmentcards() {

    const navigate = useNavigate();

    const bitcoin = (id) => {
        navigate('/investmentslist', { state: { currencyID: id } });
    }

    const ethereum = (id) => {
        navigate('/investmentslist', { state: { currencyID: id } });
    }

    const tether = (id) => {
        navigate('/investmentslist', { state: { currencyID: id } });
    }

    const litecoin = (id) => {
        navigate('/investmentslist', { state: { currencyID: id } });
    }

    const binancecoin = (id) => {
        navigate('/investmentslist', { state: { currencyID: id } });
    }

    const binanceusd = (id) => {
        navigate('/investmentslist', { state: { currencyID: id } });
    }

    const tron = (id) => {
        navigate('/investmentslist', { state: { currencyID: id } });
    }

    const dogecoin = (id) => {
        navigate('/investmentslist', { state: { currencyID: id } });
    }

    const shibainu = (id) => {
        navigate('/investmentslist', { state: { currencyID: id } });
    }

    return (
        <>
            <Link className='cards-p' to='/myinvestmentorders'>
                <p>My Investments</p>
            </Link>
            <div className='cards'>
                <h1>Invest In !</h1>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                        <ul className='cards__items'>
                            <>
                                <li className='cards__item'>
                                    <div className='cards__item__link' onClick={() => bitcoin('BTC')}>
                                        <figure className='cards__item__pic-wrap'>
                                            <img
                                                className='cards__item__img'
                                                alt='Travel'
                                                src={process.env.PUBLIC_URL + "Logos/Bitcoin.png"}
                                            />
                                        </figure>
                                        <div className='cards__item__info'>
                                            <h5 className='cards__item__text'>BITCOIN</h5>
                                        </div>
                                    </div>
                                </li>
                            </>
                            <>
                                <li className='cards__item'>
                                    <div className='cards__item__link' onClick={() => ethereum('ETH')}>
                                        <figure className='cards__item__pic-wrap'>
                                            <img
                                                className='cards__item__img'
                                                alt=''
                                                src={process.env.PUBLIC_URL + "Logos/Ethereum.png"}
                                            />
                                        </figure>
                                        <div className='cards__item__info'>
                                            <h5 className='cards__item__text'>ETHEREUM</h5>
                                        </div>
                                    </div>
                                </li>
                            </>
                            <>
                                <li className='cards__item'>
                                    <div className='cards__item__link' onClick={() => tether('USDT')}>
                                        <figure className='cards__item__pic-wrap'>
                                            <img
                                                className='cards__item__img'
                                                alt='Travel'
                                                src={process.env.PUBLIC_URL + "Logos/USDT.png"}
                                            />
                                        </figure>
                                        <div className='cards__item__info'>
                                            <h5 className='cards__item__text'>USDT</h5>
                                        </div>
                                    </div>
                                </li>
                            </>
                        </ul>
                        <ul className='cards__items'>
                            <>
                                <li className='cards__item'>
                                    <div className='cards__item__link' onClick={() => litecoin('LTC')}>
                                        <figure className='cards__item__pic-wrap'>
                                            <img
                                                className='cards__item__img'
                                                alt='Travel'
                                                src={process.env.PUBLIC_URL + "Logos/Litecoin.png"}
                                            />
                                        </figure>
                                        <div className='cards__item__info'>
                                            <h5 className='cards__item__text'>LITECOIN</h5>
                                        </div>
                                    </div>
                                </li>
                            </>
                            <>
                                <li className='cards__item'>
                                    <div className='cards__item__link' onClick={() => binancecoin('BNB')}>
                                        <figure className='cards__item__pic-wrap'>
                                            <img
                                                className='cards__item__img'
                                                alt='Travel'
                                                src={process.env.PUBLIC_URL + "Logos/BNB.png"}
                                            />
                                        </figure>
                                        <div className='cards__item__info'>
                                            <h5 className='cards__item__text'>BNB</h5>
                                        </div>
                                    </div>
                                </li>
                            </>
                            <>
                                <li className='cards__item'>
                                    <div className='cards__item__link' onClick={() => binanceusd('BUSD')}>
                                        <figure className='cards__item__pic-wrap'>
                                            <img
                                                className='cards__item__img'
                                                alt='Travel'
                                                src={process.env.PUBLIC_URL + "Logos/BUSD.png"}
                                            />
                                        </figure>
                                        <div className='cards__item__info'>
                                            <h5 className='cards__item__text'>BUSD</h5>
                                        </div>
                                    </div>
                                </li>
                            </>
                        </ul>
                        <ul className='cards__items'>
                            <>
                                <li className='cards__item'>
                                    <div className='cards__item__link' onClick={() => tron('TRX')}>
                                        <figure className='cards__item__pic-wrap'>
                                            <img
                                                className='cards__item__img'
                                                alt='Travel'
                                                src={process.env.PUBLIC_URL + "Logos/TRON.jpg"}
                                            />
                                        </figure>
                                        <div className='cards__item__info'>
                                            <h5 className='cards__item__text'>TRON</h5>
                                        </div>
                                    </div>
                                </li>
                            </>
                            <>
                                <li className='cards__item'>
                                    <div className='cards__item__link' onClick={() => dogecoin('DOGE')}>
                                        <figure className='cards__item__pic-wrap'>
                                            <img
                                                className='cards__item__img'
                                                alt='Travel'
                                                src={process.env.PUBLIC_URL + "Logos/DOGE.png"}
                                            />
                                        </figure>
                                        <div className='cards__item__info'>
                                            <h5 className='cards__item__text'>DOGE</h5>
                                        </div>
                                    </div>
                                </li>
                            </>
                            <>
                                <li className='cards__item'>
                                    <div className='cards__item__link' onClick={() => shibainu('SHIB')}>
                                        <figure className='cards__item__pic-wrap'>
                                            <img
                                                className='cards__item__img'
                                                alt='Travel'
                                                src={process.env.PUBLIC_URL + "Logos/SHIB.png"}
                                            />
                                        </figure>
                                        <div className='cards__item__info'>
                                            <h5 className='cards__item__text'>SHIB</h5>
                                        </div>
                                    </div>
                                </li>
                            </>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Investmentcards
