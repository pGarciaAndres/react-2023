export const getStories = async (page: number, limit: number) => {
  const res = await fetch(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  )
  const json = await res.json()
  const start = (page - 1) * limit
  const end = start + limit
  const storiesId = json.slice(start, end)
  return storiesId
}

export const getStoryDetails = async (id: number) => {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  )
  const storyDetails = await res.json()
  return storyDetails
}
