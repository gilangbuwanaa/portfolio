import { computed, ref } from 'vue'

const providerPromises = new Map()

function loadProvider(platform) {
  if (providerPromises.has(platform)) return providerPromises.get(platform)

  const spotify = platform === 'Spotify'
  const source = spotify
    ? 'https://open.spotify.com/embed/iframe-api/v1'
    : 'https://www.youtube.com/iframe_api'
  const callbackName = spotify ? 'onSpotifyIframeApiReady' : 'onYouTubeIframeAPIReady'
  const globalName = spotify ? 'Spotify' : 'YT'
  const promise = new Promise((resolve, reject) => {
    const script = document.querySelector(`script[data-music-api="${platform}"]`)
    const previousCallback = window[callbackName]
    window[callbackName] = (api) => {
      previousCallback?.(api)
      resolve(api ?? window[globalName])
    }
    if (window[globalName]?.IframeAPI || window[globalName]?.Player) {
      resolve(window[globalName])
      return
    }
    if (!script) {
      const element = document.createElement('script')
      element.src = source
      element.async = true
      element.dataset.musicApi = platform
      element.onerror = () => {
        element.remove()
        providerPromises.delete(platform)
        reject(new Error(`${platform} player could not be loaded`))
      }
      document.head.append(element)
    }
  })
  providerPromises.set(platform, promise)
  return promise
}

function youtubeVideoId(url) {
  const parsed = new URL(url)
  return parsed.hostname === 'youtu.be'
    ? parsed.pathname.slice(1)
    : parsed.searchParams.get('v')
}

export function createEmbeddedPlayer(target, track, onState) {
  const host = document.createElement('div')
  target.replaceChildren(host)

  if (track.platform === 'Spotify') {
    return loadProvider('Spotify').then((api) => new Promise((resolve, reject) => {
      try {
        api.IFrameAPI.createController(
          host,
          { uri: `spotify:track:${new URL(track.url).pathname.split('/').at(-1)}`, width: '100%', height: '152' },
          (controller) => {
            controller.addListener('playback_started', () => onState('playing'))
            controller.addListener('playback_update', (event) => {
              if (typeof event.data?.isPaused === 'boolean') {
                onState(event.data.isPaused ? 'paused' : 'playing')
              }
            })
            resolve({
              play: () => controller.play(),
              pause: () => controller.pause(),
              destroy: () => {
                controller.destroy?.()
                target.replaceChildren()
              },
            })
          },
        )
      } catch (error) {
        reject(error)
      }
    }))
  }

  return loadProvider('YouTube').then((api) => new Promise((resolve, reject) => {
    try {
      const player = new api.Player(host, {
        width: '100%',
        height: '200',
        videoId: youtubeVideoId(track.url),
        playerVars: { playsinline: 1, controls: 1, autoplay: 0, origin: window.location.origin },
        events: {
          onReady: ({ target: instance }) => {
            resolve({
              play: () => instance.playVideo(),
              pause: () => instance.pauseVideo(),
              destroy: () => {
                instance.destroy()
                target.replaceChildren()
              },
            })
          },
          onStateChange: ({ data }) => {
            if (data === api.PlayerState.PLAYING) onState('playing')
            if (data === api.PlayerState.PAUSED || data === api.PlayerState.ENDED) onState('paused')
          },
          onError: () => {
            onState('error')
            reject(new Error('YouTube could not play this track'))
          },
          onAutoplayBlocked: () => onState('paused'),
        },
      })
      void player
    } catch (error) {
      reject(error)
    }
  }))
}

export function useMusicPlayer(tracks, playerFactory = createEmbeddedPlayer) {
  const selectedIndex = ref(0)
  const status = ref('idle')
  const error = ref('')
  let controller
  let generation = 0

  const currentTrack = computed(() => tracks[selectedIndex.value])
  const isPlaying = computed(() => status.value === 'playing')

  function stateChanged(state) {
    if (state === 'playing' || state === 'paused') status.value = state
    if (state === 'error') {
      status.value = 'error'
      error.value = 'The provider could not play this track. Use the link to open it on its platform.'
    }
  }

  function select(index) {
    generation += 1
    controller?.destroy?.()
    controller = undefined
    selectedIndex.value = (index + tracks.length) % tracks.length
    status.value = 'idle'
    error.value = ''
  }

  async function play(target) {
    if (status.value === 'loading') return
    error.value = ''
    const request = generation
    try {
      if (!controller) {
        status.value = 'loading'
        const newController = await playerFactory(target, currentTrack.value, (state) => {
          if (request === generation) stateChanged(state)
        })
        if (request !== generation) {
          newController.destroy?.()
          return
        }
        controller = newController
      }
      await controller.play()
      if (status.value !== 'playing') status.value = 'ready'
    } catch {
      if (request === generation) {
        status.value = 'error'
        error.value = 'Playback could not start. Use the link to open this track on its platform.'
      }
    }
  }

  async function toggle(target) {
    if (status.value === 'playing') {
      await controller?.pause()
      return
    }
    await play(target)
  }

  function previous() { select(selectedIndex.value - 1) }
  function next() { select(selectedIndex.value + 1) }

  function dispose() {
    generation += 1
    controller?.destroy?.()
    controller = undefined
  }

  return { currentTrack, selectedIndex, status, error, isPlaying, select, previous, next, play, toggle, dispose }
}
