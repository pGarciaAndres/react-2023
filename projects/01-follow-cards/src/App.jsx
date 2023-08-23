import './App.css';
import { FollowCard } from './FollowCard';

const users = [
    {
      userName: 'pablogar88',
      name: 'Pablo Garcia',
      isFollowing: true
    },
    {
      userName: 'pheralb',
      name: 'Pablo H.',
      isFollowing: false
    },
    {
      userName: 'PacoHdezs',
      name: 'Paco Hdez',
      isFollowing: true
    },
    {
      userName: 'TMChein',
      name: 'Tomas',
      isFollowing: false
    }
  ]

export function App() {
    return (
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing }) => (
                    <FollowCard key={userName} userName={userName} initialIsFollowing={isFollowing}>
                        {name}
                    </FollowCard>
                ))
            }
        </section> 
    )
}