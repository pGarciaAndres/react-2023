import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SkillId = string

export interface Tech {
    name: string
    years: string
    avatar: string
}

export interface UpdateSkillName {
    id: string
    name: string
    years: string
}

export interface Skill extends Tech {
    id: SkillId
}

export interface SkillWithPosition extends Skill {
    position?: number
}

// let initialState: Skill[] = []
// const persistedState = localStorage.getItem('__redux__state__')
// if (persistedState) {
//     initialState = JSON.parse(persistedState).skills
// }
// ===============
const initialState: Skill[] = (() => {
    const persistedState = localStorage.getItem('__redux__state__')
    return persistedState ? JSON.parse(persistedState).skills : []
})()

export const skillsSlice = createSlice({
    name: 'skills', // const { type, payload } = action // ==> type is 'skills'
    initialState,
    reducers: {
        createNewSkill: (state, action: PayloadAction<Skill>) => {
            return [...state, { ...action.payload }]
        },
        rollbackCreate: (state, action: PayloadAction<SkillId>) => {
            return state.filter((skill) => skill.id !== action.payload)
        },
        updateSkillById: (state, action: PayloadAction<UpdateSkillName>) => {
            const { id, name, years } = action.payload
            const index = state.findIndex((i) => i.id === id)

            const newState = [
                ...state.slice(0, index),
                {
                    ...state[index],
                    name: name,
                    years: years,
                },
                ...state.slice(index + 1),
            ]

            return newState
        },
        rollbackUpdate: (state, action: PayloadAction<Skill>) => {
            const pos = state.findIndex((i) => i.id === action.payload.id)
            state.splice(pos, 1, action.payload)
        },
        deleteSkillById: (state, action: PayloadAction<SkillId>) => {
            return state.filter((skill) => skill.id !== action.payload)
        },
        rollbackDelete: (state, action: PayloadAction<SkillWithPosition>) => {
            const pos = action.payload.position ?? 0
            delete action.payload['position']
            state.splice(pos, 0, action.payload)
        },
    },
})

export default skillsSlice.reducer

export const {
    createNewSkill,
    rollbackCreate,
    updateSkillById,
    rollbackUpdate,
    deleteSkillById,
    rollbackDelete,
} = skillsSlice.actions
