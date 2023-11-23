import { Stack } from '@mui/material'

import { useStore } from '../store/questions'
import { Question } from './Question'
import { Controls } from './Controls'
import { Score } from './Score'

export const Game = () => {
  const questions = useStore((state) => state.questions)
  const currentQuestion = useStore((state) => state.currentQuestion)

  const questionData = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Controls />
        <Score />
      </Stack>
      <Question data={questionData} />
    </>
  )
}
