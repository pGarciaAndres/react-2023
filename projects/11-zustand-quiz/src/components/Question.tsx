import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from '../types'
import { useStore } from '../store/questions'

export const Question = ({ data }: { data: QuestionType }) => {
  const selectAnswer = useStore((state) => state.selectAnswer)

  const handleClick = (answerIndex: number) => () => {
    selectAnswer(data.id, answerIndex)
  }

  const getResultBgColor = (index: number) => {
    const { selectedAnswer, correctAnswer } = data

    if (selectedAnswer == null) return 'transparent'
    if (index !== correctAnswer && index !== selectedAnswer)
      return 'transparent'
    if (index === correctAnswer) return 'green'
    if (index === selectedAnswer) return 'red'

    return 'transparent'
  }

  return (
    <Card variant='outlined' sx={{ textAlign: 'left' }}>
      <Typography variant='h5' style={{ padding: '0.5em' }}>
        {data.question}
      </Typography>
      <SyntaxHighlighter
        className='syntax-highlighter'
        language='javascript'
        style={anOldHope}
      >
        {data.code}
      </SyntaxHighlighter>

      <List>
        {data.answers.map((answer, i) => (
          <ListItem key={i} disablePadding divider>
            <ListItemButton
              onClick={handleClick(i)}
              disabled={data.selectedAnswer != null}
              sx={{ backgroundColor: getResultBgColor(i) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
