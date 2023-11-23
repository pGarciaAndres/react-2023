import { Stack, IconButton } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { useStore } from '../store/questions'

export const Controls = () => {
  const questions = useStore((state) => state.questions)
  const currentQuestion = useStore((state) => state.currentQuestion)
  const nextQuestion = useStore((state) => state.nextQuestion)
  const prevQuestion = useStore((state) => state.prevQuestion)

  return (
    <Stack direction='row' alignItems='center'>
      <IconButton
        onClick={prevQuestion}
        disabled={currentQuestion === 0}
        className='material-icon'
      >
        <ArrowBackIosNew sx={{ color: '#fff' }} />
      </IconButton>
      <span style={{ fontWeight: 600 }}>
        {currentQuestion + 1} / {questions.length}
      </span>
      <IconButton
        onClick={nextQuestion}
        disabled={currentQuestion >= questions.length - 1}
        className='material-icon'
      >
        <ArrowForwardIos sx={{ color: '#fff' }} />
      </IconButton>
    </Stack>
  )
}
