import { FC } from "react";
import Layout from "../components/layout.component";

const HomePage: FC = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-xl text-red-700">Home page</h1>
      </Layout>
    </div>
  );
};

export default HomePage;
