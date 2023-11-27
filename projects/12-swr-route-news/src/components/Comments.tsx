import { Comment } from './Comment'
import { comments } from './Comments.css'

interface Props {
  ids: number[]
}
export const Comments: React.FC<Props> = (props: Props) => {
  const { ids } = props

  return (
    <ul className={comments}>
      {ids?.map((id: number) => (
        <li key={id}>
          <Comment id={id} />
        </li>
      ))}
    </ul>
  )
}
