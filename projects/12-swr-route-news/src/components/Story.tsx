import React from 'react'
import useSWR from 'swr'
import { Link } from 'wouter'
import { getStoryDetails } from '../services/storiesService'
import { calcTime } from '../utils/calcTime'
import {
  story,
  storyHeader,
  storyTitle,
  storyFooter,
  storyLink,
} from './Story.css'
import { StoryLoader } from './StoryLoader'

interface Props {
  id: number
  index: number
}

export const Story: React.FC<Props> = (props: Props) => {
  const { id, index } = props

  const { data, isLoading } = useSWR(`/story/${id}`, () => getStoryDetails(id))

  if (isLoading || !data) {
    return <StoryLoader />
  }

  const { by, kids, score, title, url, time } = data
  const relativeTime = calcTime(time)

  return (
    <article className={story}>
      <header className={storyHeader}>
        <small>{index + 1}.</small>
        <a
          className={storyTitle}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {title}
        </a>
      </header>
      <footer className={storyFooter}>
        <span>{score} points</span>
        <Link className={storyLink} href={`/comments/${id}`}>
          by {by}
        </Link>
        <Link className={storyLink} href={`/comments/${id}`}>
          {kids?.length ?? 0} comments
        </Link>
        <span>
          <time dateTime={new Date(time * 1000).toISOString()}>
            {relativeTime}
          </time>
        </span>
      </footer>
    </article>
  )
}
