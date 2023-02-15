import { useEffect, useState } from "react";
import NationModal from "../NationModal";
import Nation from "../Nation";
import nationService from "../../services/nationService";
import { INation } from "../../models/nation";


export default function ListNations() {
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setIdModal] = useState(null);
  const [nations, setNations] = useState<INation[]>([]);
  const handleCloseModal = () => {
    setIdModal(null);
    setOpenModal(false)
  }
  const handleOpenModal = (data: any) => {
    setIdModal(data._id);
    setOpenModal(true)
  }


  useEffect(() => {
    nationService
      .getAll()
      .then((res) => {
        setNations(res)
      })
  }, []);
  return (
    <>
      <div className="-m-4 flex flex-wrap">
        {nations.map(item => {
          return (<Nation key={`nation_${item._id}`} data={item} handleOpenModal={handleOpenModal}></Nation>)
        })}


      </div>
      {openModal && <NationModal handleCloseModal={handleCloseModal} nationId={modalId}></NationModal>}

    </>



  );
}