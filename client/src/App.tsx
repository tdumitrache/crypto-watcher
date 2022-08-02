import { Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/dashboard/index';
import { Layout } from 'layout';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
