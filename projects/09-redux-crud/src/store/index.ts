import { configureStore, type Middleware } from '@reduxjs/toolkit'
import skillsReducer, {
    rollbackCreate,
    rollbackUpdate,
    rollbackDelete,
} from './skills/reducer'
import { toast } from 'sonner'

const persistanceMiddleware: Middleware = (store) => (next) => (action) => {
    console.log('State before action: ', store.getState())
    // State --> { skills: Array(3) } ⏺️⏺️⏺️

    console.log('Action: ', action)
    // Action --> { payload {name: 'text', years: 'x', avatar: 'url'}, type: 'skills/createNewSkill' } 🔥

    next(action)

    console.log('State after action: ', store.getState())
    // State --> { skills: Array(4) } ⏺️⏺️⏺️➕⏺️

    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware =
    (store) => (next) => (action) => {
        const { type, payload } = action
        const prevState = store.getState() as RootState
        next(action)

        if (type === 'skills/createNewSkill') {
            const { id, name } = payload
            //Change 'todos' --> 'foo' to test rollback
            fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                body: payload,
            })
                .then((res) => {
                    if (res.ok) {
                        toast.success(`Skill ${name} added!`)
                    } else {
                        toast.error(`Error adding Skill ${name}`)
                        store.dispatch(rollbackCreate(id))
                    }
                })
                .catch((err) => {
                    console.log('Error ADD: ', err)
                })
        }

        if (type === 'skills/updateSkillById') {
            const { id, name, years } = payload
            const skill = prevState.skills.find((skill) => skill.id === id)

            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: 'foo',
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => {
                    if (res.ok) {
                        toast.success(
                            `Skill updated: ${name} - ${years} years!`,
                        )
                    } else {
                        toast.error(`Error updating ${name}`)
                        if (skill) {
                            store.dispatch(rollbackUpdate(skill))
                        }
                    }
                })
                .catch((err) => {
                    console.log('Error UPDATE: ', err)
                })
        }

        if (type === 'skills/deleteSkillById') {
            const skillId = payload
            const position = prevState.skills.findIndex(
                (skill) => skill.id === skillId,
            )
            const skill = prevState.skills.find((skill) => skill.id === skillId)

            //Change 'todos' --> 'foo' to test rollback
            fetch(`https://jsonplaceholder.typicode.com/todos/${skillId}`, {
                method: 'DELETE',
            })
                .then((res) => {
                    if (res.ok) {
                        toast.success(
                            `Skill ${skill ? skill.name : ''} deleted!`,
                        )
                    } else {
                        toast.error(`Error deleting ${skill ? skill.name : ''}`)
                        if (skill) {
                            store.dispatch(
                                rollbackDelete({ position, ...skill }),
                            )
                        }
                    }
                })
                .catch((err) => {
                    console.log('Error DELETE: ', err)
                })
        }
    }

export const store = configureStore({
    reducer: {
        skills: skillsReducer,
    },
    middleware: [persistanceMiddleware, syncWithDatabaseMiddleware],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
