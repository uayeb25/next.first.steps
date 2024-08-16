'use client';
import { useEffect, useState } from "react";

import CardApp from "@/components/CardApp";
import DrawerPanel from "@/components/DrawerPanel";

import { GetCard, GetCardItemFiles } from "@/services/nextcard";


import { GetUserInfo } from "@/services/users";
import { useRouter } from "next/navigation";
import { EvaluateResponse } from "@/utils/requestEvaluator";



export default function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [cardFiles, setCardFiles] = useState([]);

  const handleOpen = (v) => {
    setIsOpen(v);
  }

  const OpenFileMenu = (id) => {
    setIsOpen(true);
    GetCardItemFiles(id).then( (response) => {
      setCardFiles(response);
    }).catch( (error) => {
      console.log(error);
    });
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await GetUserInfo();
        const cardData = await GetCard();
        setData(cardData);
      } catch (error) {
        const evaluatedResponse = EvaluateResponse(error);
        if (evaluatedResponse !== "") {
          router.push(evaluatedResponse);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <DrawerPanel open={isOpen} setOpen={handleOpen} files={cardFiles} />
        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">

          { data.map( (card) => (<CardApp
            key={ card.id }
            cardid={ card.id }
            title={ card.title }
            date={ card.updated_at }
            description={ card.description }
            author={ card.author }
            access={ card.access }
            totalfiles={ card.total_files }
            openFileMenu={ OpenFileMenu }
          />))}

        </ul>
      </main>

    </>
  );
}
