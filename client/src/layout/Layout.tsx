import { FC, PropsWithChildren } from 'react';
import { Footer, Header } from '.';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
