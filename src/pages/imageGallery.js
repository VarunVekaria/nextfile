import { useState, useEffect } from "react";

function ImageGallery() {
	const [images, setImages] = useState([]);
	const [count, setcount] = useState("");
	const [searchText, setSearchText] = useState("");
	const [common, setCommon] = useState([])
	// useEffect(() => {

	// 	fetchData();
	// }, []);

	async function loadImage() {
		console.log(count);
		if (count < 1) {
			alert("enter value greater or equal to 1");
		} else {
			const response = await fetch(
				`https://www.reddit.com/r/images/top.json?limit=${count}&t=month`
			);
			const data = await response.json();
			setImages(data.data.children);
			setCommon(data.data.children)
			console.log(images)
		}
	}

	function handleSearch(event) {
		setSearchText(event.target.value);
		filteredImages
	}
	const filteredImages = images.filter((image) =>
		image.data.title.toLowerCase().includes(searchText.toLowerCase())
		
	);


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

				<input
					type="number"
					value={count}
					onChange={(event) => setcount(event.target.value)}
				/>
				<button type="submit" onClick={loadImage}>
					Submit
				</button>
				<input type="text" value={searchText} onChange={handleSearch} />
			</div>
			{rows.map((row, rowIndex) => (
				<div key={rowIndex} className="flex  justify-center ">
					{row.map((image, imageIndex) => {
						const checkImg = new Image();
						// console.log(image.data);
						checkImg.src = image.data.url;
						let title1 = image.data.title;
						{console.log(filteredImages)}
						if (checkImg.complete && checkImg.naturalWidth !== 0) {
							return (
								<>
									<img
										key={imageIndex}
										className="w-1/3 shadow-xl	p-30 m-20 rounded-2xl mx-2 my-4  transform hover:scale-90 transition-all duration-500 border-slate-600	border-solid border-2"
										src={image.data.url}
									/>
									<p>{title1}</p>
								</>
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
