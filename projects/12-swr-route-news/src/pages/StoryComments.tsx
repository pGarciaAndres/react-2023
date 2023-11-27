import React, { useEffect } from 'react'
import useSWR from 'swr'
import { getStoryDetails } from '../services/storiesService'
import { Comments } from '../components/Comments'
import { useLocation } from 'wouter'

interface Props {
  params: {
    id: string
  }
}

const StoryComments: React.FC<Props> = (props: Props) => {
  const [, setLocation] = useLocation()
  const {
    params: { id },
  } = props

  const { data, isLoading } = useSWR(`/story/${id}`, () =>
    getStoryDetails(Number(id))
  )

  const { kids, title }: { kids: number[]; title: string } = data ?? {}
  const commentIds = kids?.slice(0, 10) ?? []

  useEffect(() => {
    document.title = `Hacker News - ${title}`
  })

  return isLoading ? (
    <p>Loading..</p>
  ) : (
    <>
      <button onClick={() => setLocation('/')}>Back</button>
      <Comments ids={commentIds} />
    </>
  )
}

export default StoryComments
