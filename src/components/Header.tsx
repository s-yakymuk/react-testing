const Header = () => (
  <header className="sticky top-0 border-b border-gray-600 h-16 flex items-center bg-background/80 backdrop-blur z-20 print:hidden">
    <nav className="flex max-w-7xl mx-auto justify-between items-center w-full px-8 text-sm">
      <div className="flex gap-6">
        <a
          target="_blank"
          href="https://react.dev/"
          className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          React Docs
        </a>
        <a
          target="_blank"
          href="https://testing-library.com/docs/react-testing-library/intro/"
          className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          Testing Library Docs
        </a>
      </div>
    </nav>
  </header>
);

export default Header;
