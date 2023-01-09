import { Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import Currency from 'pages/currency';
import Portfolio from 'pages/portfolio';
import { Layout } from 'layout';
import AuthContextWrapper from 'context/AuthContext';

const App = () => {
  return (
    <>
      <AuthContextWrapper>
        <Layout>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='currencies'>
              <Route path=':id' element={<Currency />} />
            </Route>
            <Route path='portfolio' element={<Portfolio />} />
          </Routes>
        </Layout>
      </AuthContextWrapper>
    </>
  );
};

export default App;
