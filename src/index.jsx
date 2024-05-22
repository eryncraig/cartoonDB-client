import { createRoot } from 'react-dom/client';

import './index.scss';

const MyCartoonApp = () => {
  return (
    <div className='my-cartoon'>
      <div>Good Morning</div>
    </div>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyCartoonApp />);