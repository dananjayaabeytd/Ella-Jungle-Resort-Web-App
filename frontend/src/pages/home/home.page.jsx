import { Navigation } from 'lucide-react';
import Hero from './components/Hero';
import Heromid from './components/Heromid';
import { BookingCard } from './components/cards';
import { BookingCardsContainer } from './components/Cardpack';
import { FAQsection } from './components/FAQ';
import topleft from '../../assets/topleft.png'

function HomePage() {
  const backgroundStyle = {
    position: 'absolute',
    top: -140,
    left: -40,
    width: '1000px', 
    height: '790px',
    zIndex: -1,
  };
  return (
    <div style={{ position: 'relative' }}>
      <img src={topleft} alt="Top Left Background" style={backgroundStyle} />
      <Hero />
      <Heromid />
      <BookingCardsContainer />
      <FAQsection />
    </div>
  );
}

export default HomePage;
