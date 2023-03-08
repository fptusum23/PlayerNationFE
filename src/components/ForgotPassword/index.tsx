import { useState } from "react";
import { IChangePasswordRequest } from "../../models/changePasswordRequest";
import authService from "../../services/authService";

export default function ForgotPassword(props: any) {
    const [inputsPassword, setInputsPassword] = useState<IChangePasswordRequest | undefined>();
    const handleChangePassword = (event: { target: { name: any; value: any; }; }) => {
        const name = `${event.target.name}`;
        const value = event.target.value;
        setInputsPassword((values: any) => ({ ...values, [name]: value }))
    }
    const resetPassword = (event: any) => {
        event.preventDefault()
        var url_string = `${window.location.origin}/${window.location.search}`
        var url = new URL(url_string);
        var token = url.searchParams.get("token");
        if (token && inputsPassword)
            authService.resetPassword({
                newPassword: inputsPassword.newPassword,
                token
            })
        window.location.href = window.location.origin
    }
    return (
        <>

            <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0">
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-bule-800 dark:border-bule-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-bule-900 md:text-2xl dark:gray-white">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#" onSubmit={resetPassword}>
                        <div>
                            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-bule-900 dark:text-gray">New Password</label>
                            <input type="password" name="newPassword" id="newPassword" className="bg-bule-50 border border-bule-300 text-bule-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-bule-700 dark:border-bule-600 dark:placeholder-bule-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChangePassword} value={inputsPassword?.newPassword} />
                        </div>
                        <button type="submit" className="w-full text-gray bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500" >Reset passwod</button>
                    </form>
                </div>
            </div>

        </>
    )
}