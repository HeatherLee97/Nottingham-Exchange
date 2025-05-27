import { useEffect, useState, useSelector } from 'react';
import { NavLink } from 'react-router-dom';

function StockDetails() {
    const user = useSelector(state => state.session.user)
  const [watchlists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/watchlists/${user.id}`);
      const responseData = await response.json();
      if (response.ok) {
        watchlists(responseData.watchlists);
      } else {
        console.error('Failed to fetch watchlists:', responseData);
      }
    }
    fetchData();
  }, []);

  const userComponents = watchlists.map((watchlist) => {
    return (
      <li key={watchlist.id}>
        <NavLink to={`/api/users`}>{watchlist.name}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default StockDetails;