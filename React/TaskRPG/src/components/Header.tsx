import type { User } from "../types.ts";
interface HeaderProps {
    user: User;
}

function Header({ user }: HeaderProps) {
    return (
        <>
            <div>
                <h1>{user.name}</h1>
                <p>{user.level}</p>
                <p>{user.or}</p>
            </div>
        </>
    );
}

export default Header;
