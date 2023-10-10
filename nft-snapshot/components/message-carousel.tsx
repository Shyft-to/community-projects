"use client";

import React from "react";
import Slider, { Settings } from "react-slick";

const SHYFT_TWITTER = "https://twitter.com/Shyft_to";
const VY_TWITTER = "https://twitter.com/trankhac_vy";

const messages = [
  `Seems like this NFT collection is going to be a wild ride that will take some time to complete.`,
  `While we wait, let's have a little chit-chat and get to know each other!`,
  <>
    This tool is powered by{" "}
    <a target="_blank" className="underline text-brand" href={SHYFT_TWITTER}>
      @Shyft
    </a>{" "}
    and built in a day by our beloved team member{" "}
    <a target="_blank" className="underline text-brand" href={VY_TWITTER}>
      @khacvy{" "}
    </a>
  </>,
  <>
    Do you know about{" "}
    <a target="_blank" className="underline text-brand" href={SHYFT_TWITTER}>
      @Shyft{" "}
    </a>
    ???
  </>,
  `We are on a mission to provide the best DevEx on Solana.`,
  `We provide speedy and cost-efficient ways to interact with Solana through our RPCs, Callbacks, and powerful APIs.`,
  `How about you fam??? Let us know about you!!!`,
  <>
    DM us{" "}
    <a target="_blank" className="underline text-brand" href={SHYFT_TWITTER}>
      @Shyft
    </a>{" "}
    !!!
  </>,
  <>
    If you found this tool useful, please consider showing your support by
    following us on{" "}
    <a target="_blank" className="underline text-brand" href={SHYFT_TWITTER}>
      X@shyft{" "}
    </a>
  </>,
];

export default function MesageCarousel() {
  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "theClass",
    arrows: false,
    autoplay: true,
  };

  return (
    <section>
      <div id="slider-container" className="max-w-lg mx-auto mt-12">
        <Slider {...settings}>
          {messages.map((f, idx) => (
            <p
              key={idx}
              className="font-semibold text-xl text-center my-10 text-amber-500"
            >
              {f}
            </p>
          ))}
        </Slider>
      </div>
    </section>
  );
}
