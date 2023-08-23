import { useState } from 'react';

export function FollowCard({ children, userName, initialIsFollowing }) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassname = isFollowing ? 'followCard-button is-following' : 'followCard-button';

    const handleClick = () => {
        setIsFollowing(!isFollowing);
    }

    return (
        <article className='followCard'>
            <header className='followCard-header'>
                <img className='followCard-avatar' src={`https://unavatar.io/${userName}`} alt="Avatar" />
                <div className='followCard-info'>
                    <strong>{children}</strong>
                    <span className='followCard-infoUserName'>{`@${userName}`}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassname} onClick={handleClick}>{text}</button>
            </aside>
        </article>
    )
}