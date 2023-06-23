import React from "react";

type Props = {};

interface MetaData {
  user: string;
  type: string;
  views: number;
  likes: number;
  dislikes: number;
  numOfComments: number;
}

function MediaPagination({}: Props) {
  const media: MetaData[] = [
    {
      user: "dani",
      type: "text",
      views: 100000,
      likes: 10000,
      dislikes: 19999,
      numOfComments: 170,
    },
    {
      user: "phil",
      type: "video",
      views: 100000,
      likes: 10000,
      dislikes: 19999,
      numOfComments: 170,
    },
    {
      user: "fam",
      type: "clip",
      views: 100000,
      likes: 10000,
      dislikes: 19999,
      numOfComments: 170,
    },
    {
      user: "gabb",
      type: "peek",
      views: 100000,
      likes: 10000,
      dislikes: 19999,
      numOfComments: 170,
    },
  ];

  const displayData = () => {
    return media.map((item, index: number) => {
      return (
        <div key={index} className="media__pagination__item">
          {Object.entries(item).map(([dataType, data]) => {
            return (
              <div
                key={data + dataType}
                className="media__pagination__item__data"
              >
                {dataType}
                {" "}
                {data}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="home__media__pagination">
      MediaPagination
      <div className="media__wrapper">{displayData()}</div>
    </div>
  );
}

export default MediaPagination;
