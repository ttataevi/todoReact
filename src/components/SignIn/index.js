import { Box, Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


const SignIn = () =>{
	return (
		<Box m={8}>
			<Grid  align = 'center'>
				<h1> Sign in</h1>
				<br/>
				<Grid item >
					< TextField label='username'/>
				</Grid >
				<br/>
				<Grid item >
					<TextField label='password'/>
				</Grid >
				<br/>
				<Grid item >
					<Button variant='contained'>Sign in</Button>
				</Grid >
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