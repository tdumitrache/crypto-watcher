import { Routes, Route } from "react-router-dom";
import Dashboard from "pages/dashboard";
import Currency from "pages/currency";
import AuthContextWrapper from "context/AuthContext";
import AssetHistory from "pages/asset-history";
import Portfolio from "pages/portfolio";
import { Layout } from "layout";

const App = () => {
  return (
    <>
      <AuthContextWrapper>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="currencies">
              <Route path=":id" element={<Currency />} />
            </Route>
            <Route path="portfolio">
              <Route index element={<Portfolio />} />
              <Route path=":id" element={<AssetHistory />} />
            </Route>
          </Routes>
        </Layout>
      </AuthContextWrapper>
    </>
  );
};

export default App;
