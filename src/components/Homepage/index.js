import { Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";

const Homepage = () => {
	return (
		<Box m={8}>
			<Grid align="center">
				<h1>Homepage</h1>
				<Grid item>
					<Link to="/signin">Sign In</Link>
				</Grid>
				<Grid item>
					<Link to="/signup">Sign Up</Link>
				</Grid>
			</Grid>
		</Box>
	);
}
export default Homepage;