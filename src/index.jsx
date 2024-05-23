import { createRoot } from 'react-dom/client';

import './index.scss';
import { MainView } from './components/MainView/main-view';

const MyCartoonApp = () => {
  return (
    <MainView />
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyCartoonApp />);