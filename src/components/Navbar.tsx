const APP_TITLE = 'Maze Solver';
const GITHUB_URL = 'https://github.com/Beacon6/maze-solver';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <a href="/" className="text-(--text-primary) text-2xl font-bold">
        {APP_TITLE}
      </a>
      {/* TODO: Add help */}
      <a href={GITHUB_URL} className="social-button">
        <img src="/github.svg" />
      </a>
    </nav>
  );
}
