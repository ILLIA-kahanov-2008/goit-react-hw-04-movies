import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export function Navigation() {
  return (
    <nav className={s.navList}>
      <NavLink exact to="/" className="navLink" activeClassName="activeNavLink">
        Home
      </NavLink>

      <NavLink to="/movies" className="navLink" activeClassName="activeNavLink">
        Movies
      </NavLink>
    </nav>
  );
}
