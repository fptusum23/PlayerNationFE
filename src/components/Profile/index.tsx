import { useEffect, useState } from "react";
import { IChangePasswordRequest } from "../../models/changePasswordRequest";
import { IForgotPasswordRequest } from "../../models/forgotPasswordRequest";
import { IUser } from "../../models/user";
import authService from "../../services/authService";


export default function Profile(props: any) {
    const [inputsUser, setInputsUser] = useState<{
        name: string,
        email: string
    }>();
    const [inputsPassword, setInputsPassword] = useState<IChangePasswordRequest | undefined>();
    useEffect(() => {
        authService.info().then(res => {
            const { results: { object: { name, email } } } = res;
            setInputsUser({ name, email });
        });

    }, [])
    const handleChangeProfile = (event: { target: { name: any; value: any; }; }) => {
        const name = `${event.target.name}`;
        const value = event.target.value;
        setInputsUser((values: any) => ({ ...values, [name]: value }))
    }
    const handleChangePassword = (event: { target: { name: any; value: any; }; }) => {
        const name = `${event.target.name}`;
        const value = event.target.value;
        setInputsPassword((values: any) => ({ ...values, [name]: value }))
    }
    const changeProfile = (event: any) => {
        event.preventDefault()
        authService.updateProfile(inputsUser).then(res => {
            const { results: { object: { name, email } } } = res;
            setInputsUser({ name, email });
        })
    }
    const changePassword = (event: any) => {
        event.preventDefault()
        if (!inputsPassword) return
        authService.changePassword(inputsPassword).then(res => {
            setInputsPassword(undefined);
        })
    }
    return (
        inputsUser &&
        <div className="max-w-2xl mx-auto">
            <h1 className="mb-8">Profile</h1>
            <form onSubmit={changeProfile}>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={inputsUser.email} required readOnly />
                    <label htmlFor="email" className="absolute text-sm text-blue-500 dark:text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100  peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={inputsUser.name} required onChange={handleChangeProfile} />
                    <label htmlFor="name" className="absolute text-sm text-blue-500 dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                </div>


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form>
            <form className="mt-8" onSubmit={changePassword}>
                <h1 className="mb-8">Password</h1>

                <div className="relative z-0 mb-6 w-full group">
                    <input type="password" name="oldPassword" id="oldPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChangePassword} />
                    <label htmlFor="oldPassword" className="absolute text-sm text-blue-500 dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChangePassword} />
                    <label htmlFor="newPassword" className="absolute text-sm text-blue-500 dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div>



                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form>
        </div>

    )

}