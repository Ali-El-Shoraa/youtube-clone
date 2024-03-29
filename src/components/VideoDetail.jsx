import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { fetchFormAPI } from "../utils/fetchFormAPI";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";

function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState();

  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchFormAPI(`videos?part=contentDetails,snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFormAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) =>
      setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return "loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    videoDetail && (
      <Box minHeight="95vh">
        <Stack direction={{ xs: "column", md: "row" }}>
          <Box flex={1}>
            <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
              />
              <Typography variant="h5" color="#fff" fontWeight="bold" p={2}>
                {title}
              </Typography>

              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ color: "#fff" }}
                py={1}
                px={2}
              >
                {/*  */}
                <Link to={`/channelId/${channelId}`}>
                  <Typography variant={{ sm: "subtitle1", md: "h6" }} color={"#fff"}>
                    {channelTitle}
                    <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
                  </Typography>
                </Link>

                {/*  */}

                <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>

                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(likeCount).toLocaleString()} like
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Box px={2} py={{ md: 1, xs: 5 }} justifyContent={"center"} alignItems={"center"}>
            <Videos videos={videos} direction="column" />
          </Box>
        </Stack>
      </Box>
    )
  );
}

export default VideoDetail;
