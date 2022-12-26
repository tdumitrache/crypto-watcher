import { FC, ReactNode } from 'react';
import { Footer, Header } from '.';

const Layout: FC<any> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
