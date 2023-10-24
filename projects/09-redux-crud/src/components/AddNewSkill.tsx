import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useSkills } from '../hooks/useSkills'
import { useState } from 'react'

export const AddNewSkill: React.FC = () => {
    const { addNewSkill } = useSkills()
    const [error, setError] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(false)

        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const years = formData.get('years') as string
        const avatar = formData.get('avatar') as string

        if (!name || !years || !avatar) {
            return setError(true)
        }

        addNewSkill({ name, years, avatar })
        setError(false)
        form.reset()
    }

    return (
        <Card style={{ marginTop: '16px' }}>
            <Title>Add New Skill</Title>
            <form
                autoComplete="off"
                className="new-skill-form"
                onSubmit={handleSubmit}
                onFocus={() => setError(false)}
            >
                <TextInput name="name" placeholder="Skill name" />
                <TextInput name="years" placeholder="Years of experience" />
                <TextInput name="avatar" placeholder="Avatar" />
                <Button type="submit">Add Skill</Button>
                <span style={{ alignSelf: 'center' }}>
                    {error && <Badge color="red">Oops! Invalid data</Badge>}
                </span>
            </form>
        </Card>
    )
}
