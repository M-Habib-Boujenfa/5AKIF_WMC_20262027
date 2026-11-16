import type { User } from "../types.ts";
import "../css/Header.css";

interface HeaderProps {
    user: User;
}

function Header({ user }: HeaderProps) {
    return (
        <header className="header-container">
            <h1>{user.name}</h1>
            <div className="header-stats">
                <p className="stat-gold">🪙 {user.or} Or</p>
            </div>
        </header>
    );
}

export default Header;
