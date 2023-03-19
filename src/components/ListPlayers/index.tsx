
import { useEffect, useState } from "react";
import { EAction } from "../../enum/action";
import { INation } from "../../models/nation";
import { IPlayer } from "../../models/player";
import { IResponsePaging } from "../../models/reponsePaging";
import nationService from "../../services/nationService";
import playerService from "../../services/playerService";
import Filter, { IFilter } from "../Filter";
import Player from "../Player";
import PlayerModal from "../PlayerModal";

export default function ListPlayers(props: any) {
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState<EAction>();
  const [modalId, setIdModal] = useState(null);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [nations, setNations] = useState<INation[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: IFilter[] }>({});
  const [query, setQuery] = useState<any>({});
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
  const handleFilter = (data: any) => {
    setQuery({ ...data })
  }

  useEffect(() => {
    const filter: any = {}

    Object.keys(query).forEach(key => {
      if (query[key]) {
        filter[key] = query[key]
      }


    })
    playerService
      .getAll({
        filter,
        // page: paging.currentPage,
        // limit: 4
      })
      .then((res: IResponsePaging<IPlayer>) => {
        const { pagination, results: { objects: { rows } } } = res;
        setPlayers([...rows])
      })

  }, [openModal, modalId, query]);
  useEffect(() => {

    const nationFilter: { name: string; value: string; }[] = [
      {
        name: "All",
        value: ""
      }
    ]

    nations.forEach(item => {
      nationFilter.push({
        name: item.name,
        value: item._id || ""
      })
    })

    setFilters({ ...filters, 'nation': nationFilter })
  }, [nations])
  useEffect(() => {
    nationService
      .getAll()
      .then((res: IResponsePaging<INation>) => {
        const { pagination, results: { objects: { rows } } } = res;
        setNations([...rows])
      })
    const positionFilter: { name: string; value: string; }[] = [
      {
        name: "All",
        value: ""
      },
      {
        name: "goalkeeper",
        value: "goalkeeper"
      },
      {
        name: "midfielder",
        value: "midfielder"
      },
      {
        name: "forward",
        value: "forward"
      },
      {
        name: "defender",
        value: "defender"
      }
    ]



    setFilters({ ...filters, 'position': positionFilter })
  }, [])
  return (
    <>
      <Filter filters={filters} handleFilter={handleFilter} />
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