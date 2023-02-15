import { useEffect, useState } from "react";
import { IPlayer } from "../../models/player";
import playerService from "../../services/playerService";


export default function PlayerModal(props: any) {
    const [inputs, setInputs] = useState<IPlayer>();

    useEffect(() => {
        playerService.getById(props.playerId).then(res => {
            if (res) {
                setInputs(res)
            }
        })
    }, []);

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const name = `${event.target.name}`;
        const value = event.target.value;
        setInputs((values: any) => ({ ...values, [name]: value }))
    }

    const handleSave = () => {
        if (inputs) playerService.updateById(props.playerId, inputs)
        handleCloseModal()

    }
    const handleRemove = () => {
        playerService.deleteById(props.playerId)
        handleCloseModal()
    }
    const handleCloseModal = () => {
        props.handleCloseModal()
    }
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">

                                <div className="text-center sm:mt-0 sm:text-left  w-full">
                                    <div className="mb-6 w-full">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-800 dark:text-blue-900">Name</label>
                                        <input type="text" id="email"
                                            className="bg-gray-50 border border-blue-300 text-blue-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-blue-500 dark:placeholder-gray-400 dark:text-blue-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            name="name"
                                            value={inputs?.name || ""}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-blue-800 dark:text-blue-900">Image</label>
                                        <input type="text" id="password" className="bg-gray-50 border border-blue-300 text-blue-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-blue-500 dark:placeholder-gray-400 dark:text-blue-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            name="image"
                                            value={inputs?.image || ""}
                                            onChange={handleChange}
                                            required />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleRemove}>Remove</button>
                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-blue-300 bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleSave}>Save</button>
                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-blue-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}