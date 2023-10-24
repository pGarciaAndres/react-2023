import {
    Card,
    Table,
    TableRow,
    TableHead,
    TableHeaderCell,
    TableBody,
    Title,
    Badge,
} from '@tremor/react'
import { useAppSelector } from '../hooks/store'
import { SkillRow } from './SkillRow'

export const SkillTable: React.FC = () => {
    const skills = useAppSelector((state) => state.skills)
    return (
        <Card>
            <Title style={{ display: 'inline-flex' }}>Knowledge</Title>
            <Badge style={{ marginLeft: '8px' }}>{skills.length}</Badge>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Skill</TableHeaderCell>
                        <TableHeaderCell>Years</TableHeaderCell>
                        <TableHeaderCell className="text-end">
                            Actions
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {skills.map((skill) => (
                        <SkillRow key={skill.id} skill={skill} />
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}
