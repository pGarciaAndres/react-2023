import { useAppDispatch } from './store'
import {
    createNewSkill,
    updateSkillById,
    deleteSkillById,
} from '../store/skills/reducer'
import type { SkillId, Tech } from '../store/skills/reducer'

export interface UpdateSkillName {
    id: string
    name: string
    years: string
}

export const useSkills = () => {
    const dispatch = useAppDispatch()

    const addNewSkill = ({ name, years, avatar }: Tech) => {
        const id = crypto.randomUUID()
        dispatch(createNewSkill({ id, name, years, avatar }))
    }

    const updateSkill = ({ id, name, years }: UpdateSkillName) => {
        dispatch(updateSkillById({ id, name, years }))
    }

    const removeSkill = (skillId: SkillId) => {
        dispatch(deleteSkillById(skillId))
    }

    return { addNewSkill, updateSkill, removeSkill }
}
