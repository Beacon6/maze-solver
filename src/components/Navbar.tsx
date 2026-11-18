import { memo } from 'react';

const Navbar = memo(function Navbar() {
  const appTitle = 'MazeSolver';
  const githubUrl = 'https://github.com/Beacon6/maze-solver';

  return (
    <nav className="flex items-center justify-between">
      <a href="/" className="text-(--text-primary) text-2xl font-bold">
        {appTitle}
      </a>
      <a href={githubUrl} className="social-button">
        <img src="github.svg" />
      </a>
    </nav>
  );
});

export default Navbar;
