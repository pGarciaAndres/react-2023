import React from 'react'
import useSWR from 'swr'
import { getStoryDetails } from '../services/storiesService'
import { CommentLoader } from './CommentLoader'
import { calcTime } from '../utils/calcTime'
import { Comments } from './Comments'

interface Props {
  id: number
}

export const Comment: React.FC<Props> = (props: Props) => {
  const { id } = props

  const { data, isLoading } = useSWR(`/comment/${id}`, () =>
    getStoryDetails(id)
  )

  if (isLoading) {
    return <CommentLoader />
  }

  const { by, text, time, kids } = data
  const relativeTime = calcTime(time)

  return (
    <>
      <details open>
        <summary>
          <small>
            <span>{by}</span>
            <div>{relativeTime}</div>
          </small>
        </summary>
        <p dangerouslySetInnerHTML={{ __html: text }} />
      </details>

      {kids?.length > 0 && <Comments ids={kids.slice(0, 10)} />}
    </>
  )
}
