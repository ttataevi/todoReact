import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import App from "./components/App";
import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Routes>
				<Route path="signin" element={<SignIn/>}/>
				<Route path="signup" element={<SignUp/>}/>
				<Route path="/" element={<Homepage/>}/>
				<Route path="app" element={<App/>}/>
			</Routes>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root'));
