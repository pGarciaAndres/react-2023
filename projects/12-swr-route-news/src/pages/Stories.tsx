import React, { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import { getStories } from '../services/storiesService'
import { Story } from '../components/Story'

const Stories: React.FC = () => {
  const { data, size, setSize } = useSWRInfinite(
    (index) => `stories/${index + 1}`,
    (key) => {
      const [, page] = key.split('/')
      return getStories(Number(page), 10)
    }
  )

  const stories = data?.flat()

  useEffect(() => {
    document.title = 'Hacker News'
  })

  return (
    <>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {stories?.map((id: number, index: number) => (
          <li key={id}>
            <Story id={id} index={index} />
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          setSize(size + 1)
        }}
      >
        Load More
      </button>
    </>
  )
}

export default Stories
