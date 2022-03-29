import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";

const SignIn = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const username = useRef('');
	const password = useRef('');


	const signInFunction = () => {
		if (username.current.value.trim().length === 0 || password.current.value.trim().length === 0) {
			alert("Fill all info");
		} else {
			axios.post('http://127.0.0.1:5000/checkUser', {
				'name': username.current.value.trim(),
				'password': password.current.value.trim(),
			})
				.then((response) => {
					if (!response.data.answer) {
						alert("Incorrect information!")
					} else {
						dispatch(setUser(response.data.returnedId));
						navigate('/app');
					}
				});
		}
	}

	return (
		<Box m={8}>
			<Grid align='center'>
				<h1> Sign in</h1>
				<br/>
				<Grid item>
					< input placeholder="Enter username:" ref={username}/>
				</Grid>
				<br/>
				<Grid item>
					<input placeholder="Enter password:" type="password" ref={password}/>
				</Grid>
				<br/>
				<Grid item>
					<Button variant='contained' onClick={() => signInFunction()}>Sign in</Button>
				</Grid>
				<br/>
				<Grid item>
					<Link to="/signup">Don't have an account?</Link>
				</Grid>
				<Grid item>
					<Link to="/">Homepage</Link>
				</Grid>
			</Grid>
		</Box>
	)

}

export default SignIn;