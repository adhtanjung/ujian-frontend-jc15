import React, { useState } from "react";
import {
	Carousel,
	CarouselItem,
	CarouselControl,
	CarouselIndicators,
	CarouselCaption,
} from "reactstrap";

const items = [
	{
		src:
			"https://cdn.shopify.com/s/files/1/0818/5369/files/11.13_Snowe_NovemberHoliday93679_4ebc00d4-2d18-4fbc-977a-7991c8629889_2048x.jpg?v=1607636248",
		altText: "Slide 1",
		caption: "Home For The Holidays",
	},
	{
		src:
			"https://cdn.shopify.com/s/files/1/0818/5369/files/11.13_Snowe_NovemberHoliday93080_f243901e-33eb-4fe5-8801-af3e40ca10d0_2048x.jpg?v=1607636263",
		altText: "Slide 2",
		caption: "Got You Covered",
	},
	{
		src:
			"https://cdn.shopify.com/s/files/1/0818/5369/files/11.13_Snowe_NovemberHoliday94559_b10b4c8e-a43a-485d-9b26-6fc33a40cc49_2048x.jpg?v=1607636238",
		altText: "Slide 3",
		caption: "Perfect Fit",
	},
];

const Example = (props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);

	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};

	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};

	const goToIndex = (newIndex) => {
		if (animating) return;
		setActiveIndex(newIndex);
	};

	const slides = items.map((item) => {
		return (
			<CarouselItem
				onExiting={() => setAnimating(true)}
				onExited={() => setAnimating(false)}
				key={item.src}
			>
				<img
					src={item.src}
					alt={item.altText}
					height="600px"
					width="1600px"
					style={{ objectFit: "cover" }}
				/>
				<CarouselCaption captionHeader={item.caption} />
			</CarouselItem>
		);
	});

	return (
		<Carousel activeIndex={activeIndex} next={next} previous={previous}>
			<CarouselIndicators
				items={items}
				activeIndex={activeIndex}
				onClickHandler={goToIndex}
			/>
			{slides}
			<CarouselControl
				direction="prev"
				directionText="Previous"
				onClickHandler={previous}
			/>
			<CarouselControl
				direction="next"
				directionText="Next"
				onClickHandler={next}
			/>
		</Carousel>
	);
};

export default Example;
