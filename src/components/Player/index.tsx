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
                    <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">{data.nation}</h3>
                    <h2 className="title-font text-lg font-medium text-gray-900">{data.name}</h2>
                    <p className="mt-1">{data.date}</p>
                </div>
                <div className="flex flex-col justify-end" >
                    <button data-modal-target={`nationModal${data.id}}`} data-modal-toggle={`nationModal${data.id}}`} type="button" onClick={handleOpenModal} className="align-bottom inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Modify</button>
                </div>
            </div>
        </div>

    );
}