import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { Box, styled, Typography } from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Root = styled(Box)(({ theme }) => ({
  position: "relative",
  aspectRatio: "2 / 1",
  width: "100%",
  "& .swiper": {
    width: "100%",
    height: "100%",
  },
  "& .swiper-wrapper": {
    height: "100%",
    width: "100%",
  },
  "& .swiper-slide": {
    position: "relative",
    backgroundColor: theme.palette.grey[200],
    height: "100%",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "brightness(0.75)",
    },
    "& .swiper-content": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    },
  },
}));

export type ImageSliderValue = Record<
  "image" | "primary" | "secondary" | "link",
  string | undefined
>;

export type ImageSliderProps = {
  value?: ImageSliderValue[];
};

export const ImageSlider = (props: ImageSliderProps) => {
  return (
    <Root>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {props.value?.map((item, index) => (
          <SwiperSlide key={index}>
            {item.image && <img src={item.image} alt={`slide-${index}`} />}
            {(item.primary || item.secondary) && (
              <div className="swiper-content">
                {item.primary && (
                  <Typography variant="h4" fontWeight="bold">
                    {item.primary}
                  </Typography>
                )}
                {item.secondary && (
                  <Typography variant="caption">{item.secondary}</Typography>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Root>
  );
};
