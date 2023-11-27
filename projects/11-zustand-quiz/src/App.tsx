import { Container, Typography, Stack } from '@mui/material'
import './App.css'
import { StartButton } from './components/StartButton'
import { useStore } from './store/questions'
import { Game } from './components/Game'

function App() {
  const questions = useStore((state) => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack
          direction='row'
          gap={2}
          alignItems='center'
          justifyContent='center'
          marginBottom={2}
        >
          <Typography variant='h3' component='h1'>
            JS Test
          </Typography>
        </Stack>
        {questions.length === 0 && <StartButton />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
