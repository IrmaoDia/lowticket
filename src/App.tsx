import { Header, Hero } from './components/Hero';
import { PageGallery, ProjectGallery } from './components/Galleries';
import { Benefits, Bonuses, Product } from './components/Product';
import { Guarantee, Offers } from './components/Offers';
import { FAQ } from './components/FAQ';

export default function App() {
  return <><Header /><main><Hero /><PageGallery /><ProjectGallery /><Benefits /><Product /><Bonuses /><Offers /><Guarantee /><FAQ /></main></>;
}
