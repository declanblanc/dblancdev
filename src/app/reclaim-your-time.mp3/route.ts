import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const AUDIO_FILE = join(process.cwd(), 'reclaim-your-time.mp3')

export async function GET(request: Request) {
  try {
    const { size } = await stat(AUDIO_FILE)
    const rangeHeader = request.headers.get('range')

    if (!rangeHeader) {
      const audio = await readFile(AUDIO_FILE)
      return new Response(audio, {
        status: 200,
        headers: {
          'content-type': 'audio/mpeg',
          'content-length': String(size),
          'accept-ranges': 'bytes',
          'cache-control': 'public, max-age=3600',
        },
      })
    }

    const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader)
    if (!match) {
      return new Response('Invalid range', {
        status: 416,
        headers: {
          'content-range': `bytes */${size}`,
        },
      })
    }

    const start = match[1] ? Number.parseInt(match[1], 10) : 0
    const end = match[2] ? Number.parseInt(match[2], 10) : size - 1

    if (Number.isNaN(start) || Number.isNaN(end) || start < 0 || end < start || end >= size) {
      return new Response('Range not satisfiable', {
        status: 416,
        headers: {
          'content-range': `bytes */${size}`,
        },
      })
    }

    const audio = await readFile(AUDIO_FILE)
    const chunk = audio.subarray(start, end + 1)

    return new Response(chunk, {
      status: 206,
      headers: {
        'content-type': 'audio/mpeg',
        'content-length': String(chunk.byteLength),
        'content-range': `bytes ${start}-${end}/${size}`,
        'accept-ranges': 'bytes',
        'cache-control': 'public, max-age=3600',
      },
    })
  } catch {
    return new Response('Audio file not found.', {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    })
  }
}
