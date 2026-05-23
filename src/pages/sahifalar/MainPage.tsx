import Footer from "../../components/Home.tsx/Footer";
import Header from "../../components/Home.tsx/Header";
import Jobs from "../../components/Home.tsx/Jobs";
import Workers from "../../components/Home.tsx/Workers"

const MainPage = () => {
  return (
    <div className="dark:bg-gray-700">
      <Header />
      <Jobs />
      <Workers/>
      <Footer />
    </div>
  );
};

export default MainPage;