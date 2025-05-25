import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import Logo from './robinhood.svg';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const [value, setValue] = useState('');
    const [stocks, setStocks] = useState([]);

    if (!sessionUser) return null;

    const handleChange = (e) => {
        const input = e.target.value;
        setValue(input);

        
        const mockData = [
            { id: 'AAPL', name: 'Apple' },
            { id: 'TSLA', name: 'Tesla' },
            { id: 'GOOG', name: 'Google' },
            { id: 'AMZN', name: 'Amazon' },
            { id: 'MSFT', name: 'Microsoft' },
        ];

        const filtered = mockData.filter((stock) =>
            stock.name.toLowerCase().includes(input.toLowerCase())
        );

        setStocks(filtered);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/stocks/${value}`);
    };

    const resultList = stocks.slice(0, 6);

    return (
        <div className='navigation_wrapper'>
            <div className='navigation_logo'>
                <NavLink exact to='/'>
                    <img src={Logo} alt="Logo" width={25} />
                </NavLink>
            </div>
            <div className='navigation_search'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Search'
                        value={value}
                        onChange={handleChange}
                    />
                </form>
                <div className='navigation_search_results'>
                    {resultList.map((stock) => (
                        <div key={stock.id} className='navigation_search_result'>
                            <NavLink to={`/stocks/${stock.id}`}>
                                {stock.name}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
            <div className='navigation_link_container'>
                <NavLink exact to='/' className='nav_link' activeClassName='active'>
                    Portfolio
                </NavLink>
                <NavLink exact to='/transfers' className='nav_link' activeClassName='active'>
                    Transfers
                </NavLink>
                {isLoaded && (
                    <div>
                        <ProfileButton user={sessionUser} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navigation;
