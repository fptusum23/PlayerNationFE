import Modal from "../NationModal";

export default function Player(props: any) {
    const { data } = props;
    const handleOpenModal = () => {
        props.handleOpenModal(data)
    }
    return (
        <div className="w-full p-4 md:w-1/2 lg:w-1/4">
            <a className="relative block h-48 overflow-hidden rounded">
                <img alt="ecommerce" className="block h-full w-full object-cover object-center cursor-pointer" src={data.image} />
            </a>
            <div className="flex justify-between mt-4">
                <div>
                    <div className="flex mt-4">
                        <div className="relative w-12 h-12">
                            <img className="rounded-full border border-gray-100 shadow-sm" src={data?.nation?.image} alt="user image" />
                        </div>
                        <h3 className="title-font mx-2 mb-1 text-base  font-medium tracking-widest text-gray-600">{data?.position}</h3>
                    </div>

                    <h2 className="title-font text-lg font-normal text-gray-800">{data.name}</h2>
                    <p className="mt-1">{data.date}</p>
                </div>
                {
                    props.user &&
                    <div className="flex flex-col justify-end" >
                        <button data-modal-target={`nationModal${data.id}}`} data-modal-toggle={`nationModal${data.id}}`} type="button" onClick={handleOpenModal} className="align-bottom inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Modify</button>
                    </div>
                }
            </div>
        </div>

    );
}