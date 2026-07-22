export function NavBar() {
  const title = 'Maze Solver';
  const gitHubUrl = 'https://github.com/Beacon6/maze-solver';

  return (
    <>
      <a href="/" className="text-(--text-primary) text-2xl font-bold">
        {title}
      </a>
      {/* TODO: Add help */}
      <a href={gitHubUrl} className="social-button">
        <img src="/github.svg" />
      </a>
    </>
  );
}
