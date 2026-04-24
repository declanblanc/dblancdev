import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function GET() {
  const filePath = join(process.cwd(), 'show-notes.html')

  try {
    const html = await readFile(filePath, 'utf8')

    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    })
  } catch {
    return new Response('show-notes.html not found.', {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    })
  }
}
