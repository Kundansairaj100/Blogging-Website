import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import { SignupType } from "../../../common/src"
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() 
    {
        
        try 
        {
            const url = type === "signup" ? "http://127.0.0.1:8787/api/v1/user/signup" : "http://127.0.0.1:8787/api/v1/user/signin";
            const response = await axios.post(url,postInputs);
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        } catch(e) {
            console.log(e);
        }
    }
    return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div className="text-3xl font-bold mt-4 text-center">{type === "signup" ? "Create an Account" : "Log In"}</div>
        </div>
        <div className="font-thin text-center">{type === "signin" ? "Don't Have an Account?" : "Already Have an Account?"} <Link to={type === "signin" ? '/signup' : '/signin'} className="underline">{type === "signin" ? "SignUp" : "LogIn"}</Link></div>
        <div className="flex flex-col justify-center items-center p-2">
            <LabledInput lable="Name" placeholder="Kundan" onChange={(e) => { setPostInputs({ ...postInputs, name: e.target.value }) }}></LabledInput>
            {type==="signup" ? <LabledInput lable="Email" placeholder="abcd@gmail.com" onChange={(e) => { setPostInputs({ ...postInputs, email: e.target.value }) }}></LabledInput> : null }
            <LabledInput type={"password"} lable="Password" placeholder="Password" onChange={(e) => { setPostInputs({ ...postInputs, password: e.target.value }) }}></LabledInput>
            <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700  w-2/4 mt-2 ">{type === "signup" ? "SignUp" : "SignIn"}</button>
        </div>

    </div>
}

interface labledInputType {
    lable: string,
    placeholder: string,
    //@ts-ignore
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LabledInput({ lable, placeholder, onChange, type }: labledInputType) {
    return <div className="p-2 w-2/4">
        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">{lable}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>

}