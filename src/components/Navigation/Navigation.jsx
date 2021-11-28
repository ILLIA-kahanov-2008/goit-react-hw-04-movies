import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css'

export function Navigation({ history, match }) {
  // console.log('NAVIGATION match :>> ', match);
  return (
    <nav className={s.navList}>
      
          <NavLink
            exact
            to="/"
            className="navLink"
            activeClassName="activeNavLink"
          >
            Home
          </NavLink>
        
          <NavLink
            to="/movies"
            className="navLink"
            activeClassName="activeNavLink"
          >
            Movies
          </NavLink>
     
    </nav>
  );
}


// import { NavLink } from 'react-router-dom';
// import styles from './Navigation.module.css';

// export default function Navigation() {
//   return (
//     <nav>
//       <NavLink
//         exact
//         to="/"
//         className={styles.link}
//         activeClassName={styles.activeLink}
//       >
//         Главная
//       </NavLink>

//       <NavLink
//         to="/authors"
//         className={styles.link}
//         activeClassName={styles.activeLink}
//       >
//         Авторы
//       </NavLink>

//       <NavLink
//         to="/books"
//         className={styles.link}
//         activeClassName={styles.activeLink}
//       >
//         Книги
//       </NavLink>

//       <NavLink
//         to="/table"
//         className={styles.link}
//         activeClassName={styles.activeLink}
//       >
//         Таблица
//       </NavLink>
//     </nav>
//   );
// }