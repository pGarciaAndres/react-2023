import { Toaster } from 'sonner'
import './App.css'
import { SkillTable } from './components/SkillTable'
import { AddNewSkill } from './components/AddNewSkill'

function App() {
    const title = 'Skills Management with Redux 📅'

    return (
        <>
            <h1>{title}</h1>
            <SkillTable />
            <AddNewSkill />
            <Toaster richColors />
        </>
    )
}

export default App
