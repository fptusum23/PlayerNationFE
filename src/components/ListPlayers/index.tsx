
import { useEffect, useState } from "react";
import { IPlayer } from "../../models/player";
import playerService from "../../services/playerService";
import Player from "../Player";
import PlayerModal from "../PlayerModal";

export default function ListPlayers() {
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setIdModal] = useState(null);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const handleCloseModal = () => {
    setIdModal(null);
    setOpenModal(false)
  }
  const handleOpenModal = (data: any) => {
    setIdModal(data._id);
    setOpenModal(true)
  }


  useEffect(() => {
    playerService
      .getAll()
      .then((res) => {
        setPlayers(res)
      })
  }, []);
  return (
    <>
       <div className="-m-4 flex flex-wrap">
      {players.map(item => {
        return (<Player key={`player_${item._id}`} data={item} handleOpenModal={handleOpenModal}></Player>)
      })}

    </div>
    {openModal && <PlayerModal  handleCloseModal={handleCloseModal} playerId={modalId}></PlayerModal>}
    </>
 



  );
}