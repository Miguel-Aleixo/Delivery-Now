import { Button } from "./button";
import { MdExitToApp } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";


export function DropDown({ onclick, role }) {

    console.log(role)

    return (
        <div className="flex flex-col text-sm text-zinc-700">
            <Button variante="buttonMenuHomeDesktop" label="Pefil" path="/User" icon={<FaRegCircleUser className="h-5 w-5 text-orange-500" /> } />
            {role === "ADMINISTRADOR" ? (
                <Button variante="buttonMenuHomeDesktop" label="Dashboard" path="/dashboard" icon={<MdOutlineSpaceDashboard className="text-orange-500 h-5 w-5" />}
                />
            ) : ""}
            <Button variante="buttonMenuHomeDesktop" label="Sair" onClick={onclick} icon={<MdExitToApp className="text-orange-500 h-5 w-5" />} />
        </div>
    )
}