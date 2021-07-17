export class Playlist {
  songs: string[] = []

  add (song: string): void {
    this.songs.push(song)
  }

  next (): string {
    return this.songs.shift()
  }

  addToNext (song: string): void {
    this.songs.unshift(song)
  }
}
