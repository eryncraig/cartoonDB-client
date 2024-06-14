import { createRoot } from 'react-dom/client';
import { MainView } from './components/MainView/main-view';
import { Container } from 'react-bootstrap';

import './index.scss';

const MyCartoonApp = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyCartoonApp />);