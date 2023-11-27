import { Suspense, lazy } from 'react'
import { Header } from './components/Header'
import { Route } from 'wouter'
import './App.scss'

const Stories = lazy(() => import('./pages/Stories'))
const StoryComments = lazy(() => import('./pages/StoryComments'))

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <Route path='/' component={Stories} />
          <Route path='/comments/:id' component={StoryComments} />
        </Suspense>
      </main>
    </>
  )
}

export default App
