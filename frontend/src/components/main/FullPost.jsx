import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import NavigationBar from "../navigation/AppBar";
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";
import DateFormat from 'dateformat';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// fetch("/work").then(res => console.log(res.json()));
		axios.get("/posts/full")
			.then(function (response) {
				console.log(response.data);
				setPost([...response.data]);
				setLoading(false);

			})
			.catch(function (error) {
				// handle error
				console.log(error);
				window.open("/oops", "_self");
			});
	}, [])

	function data(post, ind) {
		return (
			<Col sm={12} md={6} lg={4} key={post._id}>
				<PostCard
					title={post.title}
					postType={post.postType}
					description={post.description}
					subject={post.subName}
					dueDate={DateFormat((new Date(post.dueDate)), "d-mmm-yyyy")}
					postedBy={post.author}
					url={post.url}
					file={post.file}
					postedOn={DateFormat((new Date(post.updatedAt)), "d-mmm-yy, h:mm TT")}
				/>
			</Col>
		);
	}
	return (
		<Fragment>
			<NavigationBar />
			<Container fluid>
				<h1>Posts</h1>
				{loading && <LinearProgress />}
				<Row>
					{post.map(data)}
				</Row>
			</Container>
		</Fragment >
	)

}

export default App;
