
import { useState } from "react"
import { Link } from "react-router-dom"
import BrowserIcon from "../icons/BrowserIcon"
import BrowserIconHover from "../icons/BrowserIconHover"
import HomeIcon from "../icons/HomeIcon"
import HomeIconHover from "../icons/HomeIconHover"
import SettingsIcon from "../icons/SettingsIcon"
import SettingsIconHover from "../icons/SettingsIconHover"
import SwapIcon from "../icons/SwapIcon"
import SwapIconHover from "../icons/SwapIconHover"
import TransactionHistoryIcon from "../icons/TransactionHistoryIcon"
import TransactionHistoryIconHover from "../icons/TransactionHistoryIconHover"

const MenuIcon = (props: any) => {
    const [isHover, setIsHover] = useState<boolean>(false)
    return (
        <Link
        to={props.to}
        className="transition duration-300"
        draggable={false}
        data-testid="navigate-account-link"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() =>  setIsHover(false)}
    >
        {props.to === '/home' ?
            !isHover ? <HomeIcon /> : <HomeIconHover />:
         props.to === "/collectibles" ?
            !isHover ? <BrowserIcon /> : <BrowserIconHover />:
         props.to === "/swap" ?
            !isHover ? <SwapIcon /> : <SwapIconHover />:
         props.to === "/transaction_history" ?
            !isHover ? <TransactionHistoryIcon /> : <TransactionHistoryIconHover />:
         props.to === "/settings" ?
            !isHover ? <SettingsIcon /> : <SettingsIconHover />: <></>
            }
    </Link>
    )
}

export default MenuIcon