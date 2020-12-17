import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ProductModal } from "./";

const useStyles = makeStyles({
	root: {
		maxWidth: 600,
	},
	media: {
		height: 350,
		width: 400,
	},
	overlay: {
		position: "absolute",
		top: "20px",
		left: "20px",
		color: "black",
		backgroundColor: "transparent",
	},
	overlayPrice: {
		position: "absolute",
		top: "50px",
		left: "20px",
		color: "black",
		backgroundColor: "transparent",
	},
});

export default function ProductCard(props) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={props.image}
					title="Contemplative Reptile"
					style={{ objectFit: "fill" }}
				/>
				<CardContent>
					<div className={classes.overlay}>
						<Typography
							gutterBottom
							variant="h5"
							component="h2"
							style={{ fontFamily: "Crimson Text" }}
						>
							{props.name}
						</Typography>
					</div>

					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						className={classes.overlayPrice}
						style={{ fontFamily: "Crimson Text" }}
					>
						Rp. {props.price.toLocaleString()}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<ProductModal id={props.id} />
			</CardActions>
		</Card>
	);
}
