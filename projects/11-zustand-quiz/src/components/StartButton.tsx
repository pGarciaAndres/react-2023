import { Button } from '@mui/material'
import { useStore } from '../store/questions'

export const StartButton = () => {
  const getQuestions = useStore((state) => state.getQuestions)

  const handleClick = () => {
    getQuestions(10)
  }

  const questions = useStore((state) => state.questions)
  return (
    <Button onClick={handleClick} variant='contained'>
      Start
    </Button>
  )
}
