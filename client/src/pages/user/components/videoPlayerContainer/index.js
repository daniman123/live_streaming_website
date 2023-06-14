"use client";

const VideoPlayer = () => {
  return (
    <iframe
      src="https://embed.twitch.tv/?allowfullscreen=true&autoplay=true&channel=HasanAbi&controls=true&height=100%25&layout=video&muted=false&parent=localhost&referrer=http%3A%2F%2Flocalhost%3A3000%2Fdsadf&theme=dark&time=0h0m0s&width=100%25"
      controls
      style={{ width: "100%", height: "700px" }}
      allowFullScreen="True"
    ></iframe>
  );
};

export default VideoPlayer;
