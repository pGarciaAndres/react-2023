import { Stack } from '@mui/material'
import { useStore } from '../store/questions'

export const Score = () => {
  const questions = useStore((state) => state.questions)
  let correct = 0
  let incorrect = 0
  let unasnwered = 0

  questions.forEach((question) => {
    const { selectedAnswer, correctAnswer } = question
    if (selectedAnswer == null) unasnwered++
    else if (selectedAnswer === correctAnswer) correct++
    else incorrect++
  })

  return (
    <Stack direction='row' gap={2} alignItems='center' marginRight='1.5em'>
      <strong>{`✅ ${correct}`}</strong>
      <strong>{`❌ ${incorrect}`}</strong>
    </Stack>
  )
}
