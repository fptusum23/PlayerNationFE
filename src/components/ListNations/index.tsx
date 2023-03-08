import { useEffect, useState } from "react";
import NationModal from "../NationModal";
import Nation from "../Nation";
import nationService from "../../services/nationService";
import { INation } from "../../models/nation";
import { IResponsePaging } from "../../models/reponsePaging";
import { EAction } from "../../enum/action";
import Paging from "../Paging";
import { IPaging } from "../../models/paging";


export default function ListNations(props: any) {
  const [openModal, setOpenModal] = useState(false);
  const [valueFilter, setValueFilter] = useState<string>("");
  const [typeModal, setTypeModal] = useState<EAction>();
  const [modalId, setIdModal] = useState(null);
  const [nations, setNations] = useState<INation[]>([]);
  const [paging, setPaging] = useState<IPaging>({
    currentPage: 1,
    pageSize: 4,
    totalPage: 0
  });
  const handleCloseModal = () => {
    setIdModal(null);
    setOpenModal(false);
    nationService
      .getAll()
      .then((res: IResponsePaging<INation>) => {
        const { pagination, results: { objects: { rows, count } } } = res;
        setPaging({
          ...paging,
          totalPage: (count - (count % paging.pageSize)) / paging.pageSize
        })
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

  const filterNation = (event: { target: { name: any; value: any; }; }) => {
    setValueFilter(event.target.value)
  }
  const handleChangePage = (page: any) => {

    setPaging({
      ...paging,
      currentPage: page
    })
    nationService.getAll({
      filter: { "name": { "$regex": valueFilter, "$options": "i" } },
      page: page,
      limit: 4
    })
      .then((res: IResponsePaging<INation>) => {
        const { pagination, results: { objects: { count, rows } } } = res;
        setNations([...rows])
      })
  }
  useEffect(() => {
    // &filter={"name":{"$regex":"geR","$options":"i"}}&page=1&limit=4
    nationService
      .getAll({
        filter: { "name": { "$regex": valueFilter, "$options": "i" } },
        page: 1,
        limit: 4
      })
      .then((res: IResponsePaging<INation>) => {
        const { pagination, results: { objects: { count, rows } } } = res;
        setPaging({
          currentPage: 1,
          pageSize: 4,
          totalPage: (count - (count % paging.pageSize)) / paging.pageSize
        })
        setNations([...rows])
      })
  }, [openModal, modalId, valueFilter]);
  return (
    <>
      {props.user &&
        <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
          <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleOpenModalCreate}>Create</button>
        </div>
      }
      <div>


        <div className="relative hidden mr-3 md:mr-0 md:block my-4" id="search-box">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input type="text" id="search-adress-icon" className="block w-full p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." onChange={filterNation} value={valueFilter} />
        </div>

        <button type="button" className="inline-flex items-center justify-center text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
      </div>

      <div className="-m-4 flex flex-wrap">
        {nations.map(item => {
          return (<Nation user={props.user} key={`nation_${item._id}`} data={item} handleOpenModal={handleOpenModalUpdate}></Nation>)
        })}

      </div>
      <Paging data={paging} handleChangePage={handleChangePage} />
      {openModal && <NationModal typeModal={typeModal} handleCloseModal={handleCloseModal} nationId={modalId}></NationModal>}

    </>



  );
}