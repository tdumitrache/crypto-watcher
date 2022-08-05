import { FC, ReactNode } from 'react';
import { Footer, Header } from '.';

const Layout: FC<ReactNode> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
