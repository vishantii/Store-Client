import { useCallback, useEffect, useState } from "react";
import GamesItem from "../../molecules/GamesItem";
import { getFeaturedGames } from "../../../services/player";
import { GameItemTypes } from "../../../services/data-types";

export default function FeaturedGames() {
  const [gameList, setGameList] = useState([]);
  const API_IMG = process.env.NEXT_PUBLIC_IMG;
  const getFeaturedGameList = useCallback(async () => {
    const data = await getFeaturedGames();
    setGameList(data);
  }, [getFeaturedGames]);

  useEffect(() => {
    getFeaturedGameList();
  }, []);
  return (
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Our Featured
          <br /> Games This Year
        </h2>
        <div className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4" data-aos="fade-up">
          {gameList.map((items: GameItemTypes) => {
            return <GamesItem key={items._id} title={items.name} category={items.category.name} thumbnail={`${API_IMG}/${items.thumbnail}`} id={items._id} />;
          })}
        </div>
      </div>
    </section>
  );
}
