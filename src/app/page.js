'use client';

import HeaderApp from "@/components/HeaderApp";
import CardApp from "@/components/CardApp";

import NextCard from "@/components/NextCard";
import { GetCard } from "@/services/nextcard";
import { useEffect, useState } from "react";

export default function Home() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    GetCard().then( (data) => {
      setData(data);
      setLoading(false);
    });

  }
  , []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">

          { data.map( (card) => (<CardApp
            key={ card.id }
            title={ card.title }
            date="2024-01-01"
            description={ card.description }
            author={"Uayeb Caballero"}
          />))}

        </ul>
      </main>

    </>
  );
}
