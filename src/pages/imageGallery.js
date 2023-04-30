import { useState, useEffect } from "react";

function ImageGallery() {
	const [images, setImages] = useState([]);
	const [count, setcount] = useState("");
	const [searchWord, setSearchWord] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	// useEffect(() => {

	// 	fetchData();
	// }, []);

	async function loadImage() {
		// console.log(count);
		if (count < 1) {
			alert("enter value greater or equal to 1");
		} else {
			const response = await fetch(
				`https://www.reddit.com/r/images/top.json?limit=${count}&t=month`
			);
			const data = await response.json();
			// console.log(data.data)
			// setSearchResults(data.filter(item => item.toLowerCase().includes(searchWord.toLowerCase())));
			const hello = data.data.children;
			setImages(data.data.children);
			console.log(hello);
			setSearchResults(
				hello.filter((item) =>
					item.data.title.toLowerCase().includes(searchWord.toLowerCase())
				)
			);
		}
	}

	const rows = [];

	for (let i = 0; i < images.length; i += 3) {
		const row = images.slice(i, i + 3);
		rows.push(row);
	}

	const handleSearch = (event) => {
		setSearchWord(event.target.value);
		setSearchResults(
			hello.data.filter((item) =>
				item.data.title.toLowerCase().includes(event.target.value.toLowerCase())
			)
		);
		console.log(searchResults);
	};

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
				<label>
					Search:
					<input type="text" value={searchWord} onChange={handleSearch} />
				</label>
			</div>
			{rows.map((row, rowIndex) => (
				<div key={rowIndex} className="flex  justify-center ">
					{row.map((image, imageIndex) => {
						const checkImg = new Image();
						// console.log(image.data);
						checkImg.src = image.data.url;
						let title = image.data.title;

						if (checkImg.complete && checkImg.naturalWidth !== 0) {
							return (
								<div>
									<img
										key={imageIndex}
										className="w-1/3 shadow-xl	p-30 m-20 rounded-2xl mx-2 my-4  transform hover:scale-90 transition-all duration-500 border-slate-600	border-solid border-2"
										src={image.data.url}
									/>
									<p>{title}</p>
								</div>
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
