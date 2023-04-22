import { useState, useEffect } from "react";

function ImageGallery() {
	const [images, setImages] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(
				"https://www.reddit.com/r/images/top.json?limit=100&t=month"
			);
			const data = await response.json();
			setImages(data.data.children);
			
		}
		fetchData();
	}, []);

	const rows = [];

	for (let i = 0; i < images.length; i += 3) {
		const row = images.slice(i, i + 3);
		rows.push(row);
	}
	
	return (
		<div className={`container mx-auto px-4 max-w-6xl m-auto font-bold`}>
			<div className="bg-slate-50 text-center text-gray-950 text-3xl py-5 my-10 rounded-xl">
				<h1>Hi</h1>
				<p></p>
				<h2>StudyPaq!</h2>
			</div>
			{rows.map((row, rowIndex) => (
				<div key={rowIndex} className="flex  justify-center ">
					{row.map((image, imageIndex) => {
						const checkImg = new Image();
						checkImg.src = image.data.url;
						if (checkImg.complete && checkImg.naturalWidth !== 0) {
							return (
								<img
									key={imageIndex}
									className="w-1/3 shadow-xl	p-30 m-20 rounded-2xl mx-2 my-4  transform hover:scale-90 transition-all duration-500 border-slate-600	border-solid border-2"
									src={image.data.url}
								/>
							);
						} else {
							return null;
						}
					})}
				</div>
			))}
		</div>
	);
}

export default ImageGallery;
