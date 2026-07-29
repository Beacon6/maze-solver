export function Navbar() {
  const title = 'Maze Solver';
  const gitHubUrl = 'https://github.com/Beacon6/maze-solver';

  return (
    <nav className="flex items-center justify-between">
      <a href="/" className="text-(--text-primary) text-2xl font-bold">
        {title}
      </a>
      {/* TODO: Add help */}
      <a href={gitHubUrl} className="social-button">
        <img src="/github.svg" />
      </a>
    </nav>
  );
}
