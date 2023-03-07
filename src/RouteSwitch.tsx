import {BrowserRouter} from 'react-router-dom';
import App from './App';

export default function RouteSwitch() {
	return (
		<BrowserRouter basename="/">
			<App />
		</BrowserRouter>
	);
}
