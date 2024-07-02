import { createRoot } from 'react-dom/client';
import { MainView } from './components/MainView/main-view';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './index.scss';

const MyCartoonApp = () => {
  return (
    <Provider store={store}>
      <Container className='container-fluid'>
        <MainView />
      </Container>
    </Provider>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyCartoonApp />);