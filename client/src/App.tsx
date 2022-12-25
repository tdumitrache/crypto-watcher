import { Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import Currency from 'pages/currency';
import { Layout } from 'layout';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/currencies'>
            <Route path=':id' element={<Currency />} />
          </Route>
        </Routes>
      </Layout>
    </>
  );
};

export default App;
