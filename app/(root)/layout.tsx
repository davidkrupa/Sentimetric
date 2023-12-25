const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen dark:bg-main-dark-bg">
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default RootLayout;
