import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import App from './App';

import { store } from './store';

window.axios = axios;

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
