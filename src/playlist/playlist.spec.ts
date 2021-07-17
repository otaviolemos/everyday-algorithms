import { Playlist } from './playlist'

describe('Playlist', () => {
  test('should be empty when created', () => {
    const playlist = new Playlist()
    expect(playlist.songs.length).toBe(0)
  })

  test('should be able to add music at the end', () => {
    const playlist = new Playlist()
    playlist.add('Song 1')
    expect(playlist.songs.length).toBe(1)
  })

  test('should be able to get next music', () => {
    const playlist = new Playlist()
    playlist.add('Song 1')
    playlist.add('Song 2')
    playlist.add('Song 3')
    expect(playlist.next()).toBe('Song 1')
    expect(playlist.next()).toBe('Song 2')
    expect(playlist.next()).toBe('Song 3')
  })

  test('should not get music when playlist is empty', () => {
    const playlist = new Playlist()
    expect(playlist.next()).toBe(undefined)
  })

  test('should be able to add music at the beginning', () => {
    const playlist = new Playlist()
    playlist.add('Song 1')
    playlist.add('Song 2')
    playlist.add('Song 3')
    playlist.addToNext('Song 4')
    expect(playlist.next()).toBe('Song 4')
  })
})
