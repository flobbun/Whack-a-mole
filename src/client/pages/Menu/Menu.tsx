import { Link } from 'react-router-dom';
import { RoutePaths } from '../../constants/RoutePaths';
import s from './Menu.module.css';

const Menu = () => {
    return (
        <div className={s.root}>
            <h1>Whack a mole</h1>
            <Link to={RoutePaths.GAME}>
                <button>Start 🎮</button>
            </Link>
            <Link to={RoutePaths.LEADERBOARD}>
                <button>Leaderboard 📖</button>
            </Link>
        </div>
    )
}

export default Menu;