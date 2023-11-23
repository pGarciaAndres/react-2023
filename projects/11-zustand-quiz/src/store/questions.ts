import { create } from 'zustand'
import { type Question } from '../types'
import { devtools } from 'zustand/middleware'

interface State {
  questions: Question[]
  currentQuestion: number
  getQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
}

const API_URL = 'http://localhost:5173/'

export const useStore = create<State>()(
  devtools((set, get) => {
    return {
      //Estado inicial
      questions: [],
      //Pregunta actual
      currentQuestion: 0,
      //Acciones
      getQuestions: async (limit: number) => {
        const res = await fetch(`${API_URL}/data.json`)
        const json = await res.json()
        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
        set({ questions }, false)
      },

      selectAnswer: (questionId: number, answerIndex: number) => {
        const { questions } = get()
        const newQuestions = structuredClone(questions)
        const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
        const questionData = newQuestions[questionIndex]

        const isCorrectAnswer = questionData.correctAnswer === answerIndex

        newQuestions[questionIndex] = {
          ...questionData,
          isCorrectAnswer,
          selectedAnswer: answerIndex,
        }

        set({ questions: newQuestions })
      },

      nextQuestion: () => {
        const { currentQuestion, questions } = get()
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
          set({ currentQuestion: nextQuestion })
        }
      },

      prevQuestion: () => {
        const { currentQuestion } = get()
        const prevQuestion = currentQuestion - 1
        if (prevQuestion >= 0) {
          set({ currentQuestion: prevQuestion })
        }
      },
    }
  })
)
