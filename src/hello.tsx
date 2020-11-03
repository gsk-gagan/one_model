import * as React from 'react';

function HelloWorld(props: {name: String, message: String}) {
	console.log(props)
	return (
		<div>
			<h1>Hello {props.name}</h1>
			<p> Message: {props.message}</p>
		</div>
	);
}

export default HelloWorld;