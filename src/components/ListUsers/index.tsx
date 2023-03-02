import { useEffect, useState } from "react";
import { IResponsePaging } from "../../models/reponsePaging";
import { IUser } from "../../models/user";
import userService from "../../services/userService";

export default function ListUsers(props: any) {
    const [players, setPlayers] = useState<IUser[]>([]);


    useEffect(() => {
        userService
            .getAll()
            .then((res: IResponsePaging<IUser>) => {
                const { pagination, results: { objects: { rows } } } = res;
                setPlayers([...rows])
            })
    }, []);
    return (<>

        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-cyan-500 dark:text-cyan-400">
                <thead className="text-xs text-cyan-700 uppercase bg-cyan-50 dark:bg-cyan-700 dark:text-cyan-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            User name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {players.map(item => {
                        return (
                            <tr key={item._id} className="bg-white border-b dark:bg-cyan-800 dark:border-cyan-700">
                                <th scope="row" className="px-6 py-4 font-medium text-cyan-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4">
                                    {item.role}
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>

    </>)
}