import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SongsSection from '../components/sections/SongsSection.vue'
import { songs } from '../data/songs'
import { useMusicPlayer } from '../composables/useMusicPlayer'

const approvedTracks = [
  ['Tell Me', ['Grizz Music', 'CapsCtrl'], 'YouTube', 'https://youtu.be/FrHsok1FdGc'],
  ['Mindless', ['Grizz Music'], 'YouTube', 'https://youtu.be/W-7KAyXjpjc'],
  ['Fake Frnds', ['Aisah Jihan', 'Grizz Music'], 'YouTube', 'https://youtu.be/LC3TDAFwfkE'],
  ['Bangkit Kawan (Grizz Remix)', ['Ozi', 'Atuluxx', 'Grizz Music'], 'Spotify', 'https://open.spotify.com/track/1Oaalx5qRFeK2vUrwGjWWJ'],
  ['Datang Sesuka Hati', ['Atuluxx', 'Grizz Music', 'Dijafu'], 'Spotify', 'https://open.spotify.com/track/45Nh1LwSpviSZ5hDWPFNUo'],
  ['Haha Boss', ['Atuluxx', 'Grizz Music'], 'YouTube', 'https://youtu.be/ZTGaDAjLydY'],
  ['BERJANJI', ['Atuluxx', 'Grizz Music'], 'YouTube', 'https://youtu.be/s_QGFHjbpXU'],
  ['SICK BOY', ['Atuluxx', 'Grizz Music'], 'Spotify', 'https://open.spotify.com/track/0h3HfPOl6iBmJveXvK9qc7'],
  ['Nona baik', ['Atuluxx', 'Grizz Music'], 'Spotify', 'https://open.spotify.com/track/7bqBbJADu3yKuAgzLmwn1k'],
  ['SESAAT', ['Atuluxx', 'Grizz Music'], 'Spotify', 'https://open.spotify.com/track/2quX0211pj345i9kkGbqPy'],
  ['SESAAT RMX', ['Atuluxx', 'Grizz Music', 'Hyperion'], 'Spotify', 'https://open.spotify.com/track/53Ph4FmxsQQuEgSKWKxVAJ'],
  ['TERGILA GILA', ['Chaerys', 'Atuluxx', 'Grizz Music'], 'Spotify', 'https://open.spotify.com/track/6gsL1YkHdXrgUldlnjuLOc'],
  ['BISAKAH KITA?', ['Atuluxx', 'Grizz Music'], 'Spotify', 'https://open.spotify.com/track/3Twu8dVSnNsocAsqzCIkbF'],
  ['Terombang Ambing', ['Atuluxx', 'Grizz Music'], 'YouTube', 'https://youtu.be/qpd4TxQQb1Q'],
  ['Realita', ['Fahra Fidriana', 'Atuluxx', 'SULTAN', 'Grizz Music'], 'Spotify', 'https://open.spotify.com/track/1EHwDyYD4PdJDEEQwt3lx0'],
]

describe('SongsSection', () => {
  it('renders all 15 song choices and their provider links', () => {
    const wrapper = mount(SongsSection)

    expect(wrapper.get('section').attributes('id')).toBe('songs')
    expect(wrapper.findAll('ol > li')).toHaveLength(15)
    expect(wrapper.text()).toContain('Tell Me')
    expect(wrapper.text()).toContain('Realita')
    expect(songs.map(({ title, artists, platform, url }) => [title, artists, platform, url]))
      .toEqual(approvedTracks)
    expect(wrapper.get('a[href="https://youtu.be/FrHsok1FdGc"]').attributes('target')).toBe('_blank')
  })

  it('selects tracks from the list without starting playback', async () => {
    const wrapper = mount(SongsSection)

    await wrapper.findAll('ol button')[3].trigger('click')

    expect(wrapper.find('.rounded-surface h3').text()).toBe('Bangkit Kawan (Grizz Remix)')
    expect(wrapper.get('[role="status"]').text()).toBe('Ready when you are')
    expect(wrapper.get('.music-embed').element.childElementCount).toBe(0)
  })
})

describe('useMusicPlayer', () => {
  it('wraps selection and reflects only provider playback events', async () => {
    let reportState
    const control = { play: vi.fn(), pause: vi.fn(), destroy: vi.fn() }
    const player = useMusicPlayer(songs, vi.fn(async (_target, _track, onState) => {
      reportState = onState
      return control
    }))

    expect(player.currentTrack.value.id).toBe('tell-me')
    player.previous()
    expect(player.currentTrack.value.id).toBe('realita')
    player.next()
    expect(player.currentTrack.value.id).toBe('tell-me')
    await player.play({})
    expect(player.status.value).toBe('ready')
    expect(player.isPlaying.value).toBe(false)
    reportState('playing')
    expect(player.isPlaying.value).toBe(true)
    await player.toggle({})
    expect(control.pause).toHaveBeenCalledOnce()
    player.next()
    expect(control.destroy).toHaveBeenCalledOnce()
    reportState('playing')
    expect(player.status.value).toBe('idle')
    await player.play({})
    reportState('error')
    expect(player.status.value).toBe('error')
    expect(player.error.value).toContain('could not play')
    player.dispose()
    expect(control.destroy).toHaveBeenCalledTimes(2)
  })
})
