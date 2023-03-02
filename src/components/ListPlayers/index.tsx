
import { useEffect, useState } from "react";
import { EAction } from "../../enum/action";
import { IPlayer } from "../../models/player";
import { IResponsePaging } from "../../models/reponsePaging";
import playerService from "../../services/playerService";
import Player from "../Player";
import PlayerModal from "../PlayerModal";

export default function ListPlayers(props: any) {
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState<EAction>();
  const [modalId, setIdModal] = useState(null);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const handleCloseModal = () => {
    setIdModal(null);
    setOpenModal(false);
    playerService
      .getAll()
      .then((res: IResponsePaging<IPlayer>) => {
        const { pagination, results: { objects: { rows } } } = res;
        setPlayers([...rows])
      })
  }
  const handleOpenModalUpdate = (data: any, action: EAction) => {
    setTypeModal(EAction.UPDATE)
    setIdModal(data._id);
    setOpenModal(true)
  }
  const handleOpenModalCreate = () => {
    setTypeModal(EAction.CREATE)
    setOpenModal(true)
  }


  useEffect(() => {
    playerService
      .getAll()
      .then((res: IResponsePaging<IPlayer>) => {
        const { pagination, results: { objects: { rows } } } = res;
        setPlayers([...rows])
      })
  }, [openModal, modalId]);
  return (
    <>
      {props.user &&
        <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
          <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleOpenModalCreate}>Create</button>
        </div>
      }
      <div className="-m-4 flex flex-wrap">
        {players.map(item => {
          return (<Player user={props.user} key={`player_${item._id}`} data={item} handleOpenModal={handleOpenModalUpdate}></Player>)
        })}

      </div>
      {openModal && <PlayerModal typeModal={typeModal} handleCloseModal={handleCloseModal} playerId={modalId}></PlayerModal>}
    </>




  );
}