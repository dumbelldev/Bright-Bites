import Header from './components/sections/Header';
import Cursor from './components/features/Cursor';
import Greetings from './components/sections/Greetings';
import Menu from './components/sections/Menu';
import Reviews from './components/sections/Reviews';
import AboutUs from './components/sections/AboutUs';
import ContactUs from './components/sections/ContactUs';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from './context/MainContext';
import LoadingScreen from './components/features/LoadingScreen';

function App() {
  // const con = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
    // setTimeout(() => {
    //   setIsLoading(false);
    //   body.style.overflowY = 'visible';
    // }, 3900);
  }, []);

  return (
    <div className="app">
      {isLoading && <LoadingScreen />}
      <Cursor />
      <Header />
      <Greetings />
      <Menu />
      <Reviews />
      <AboutUs />
      <ContactUs />
    </div>
  );
}

export default App;
