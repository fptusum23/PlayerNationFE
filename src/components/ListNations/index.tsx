import { useEffect, useState } from "react";
import NationModal from "../NationModal";
import Nation from "../Nation";
import nationService from "../../services/nationService";
import { INation } from "../../models/nation";
import { IResponsePaging } from "../../models/reponsePaging";
import { EAction } from "../../enum/action";


export default function ListNations(props: any) {
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState<EAction>();
  const [modalId, setIdModal] = useState(null);
  const [nations, setNations] = useState<INation[]>([]);
  const handleCloseModal = () => {
    setIdModal(null);
    setOpenModal(false);
    nationService
      .getAll()
      .then((res: IResponsePaging<INation>) => {
        const { pagination, results: { objects: { rows } } } = res;
        setNations([...rows])
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
    nationService
      .getAll()
      .then((res: IResponsePaging<INation>) => {
        const { pagination, results: { objects: { count, rows } } } = res;
        setNations([...rows])
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
        {nations.map(item => {
          return (<Nation user={props.user} key={`nation_${item._id}`} data={item} handleOpenModal={handleOpenModalUpdate}></Nation>)
        })}
      </div>
      {openModal && <NationModal typeModal={typeModal} handleCloseModal={handleCloseModal} nationId={modalId}></NationModal>}

    </>



  );
}