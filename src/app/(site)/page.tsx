import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'dblanc.dev',
}

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="hero-prompt">
          <span className="p-user">dblanc</span>@<span className="p-host">dev</span>:<span className="p-path">~</span> $ <span className="p-cmd">whoami</span>
        </p>
        <div className="hero-row">
          <h1 className="hero-name">Declan Blanchard<span className="cursor" /></h1>
        </div>
        <div className="hero-row">
          <p className="tagline">Father, Husband, Software Engineer</p>
        </div>
      </section>

      <section>
        <h2 className="section-label">about</h2>
        <div className="about-text">
          <p>Computer Science Senior at <em>NJIT</em>.</p>
          <p>Incoming software engineer at <strong>Patreon</strong>.</p>
          <p className="about-text__closing">Trying to live mindfully &amp; intentionally, with honesty &amp; integrity.</p>
        </div>
      </section>
    </>
  )
}
