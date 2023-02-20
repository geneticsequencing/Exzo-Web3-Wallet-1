import TransactionsList from "./transactions/TransactionsList"

// Context
import { useSelectedNetwork } from "../context/hooks/useSelectedNetwork"
import { useSelectedAccount } from "../context/hooks/useSelectedAccount"

// Utils

import useTransactions from "../util/hooks/useTransactions"
import MenuIcon from "./menu/MenuIcon"
import { Link, useHistory } from "react-router-dom"
import AccountIcon from "./icons/AccountIcon"
import Tooltip from "./label/Tooltip"
import { getAccountColor } from "../util/getAccountColor"
import { useSelectedAddressWithChainIdChecksum } from "../util/hooks/useSelectedAddressWithChainIdChecksum"
import { useState } from "react"
import { formatHash, formatName } from "../util/formatAccount"
import CopyIcon from "./icons/CopyIcon"
import CopyTooltip from "./label/СopyToClipboardTooltip"
import VectorIcon from "./icons/VectorIcon"

import GearIcon from "../components/icons/GearIcon"
import GasPricesInfo from "../components/gas/GasPricesInfo"
import QRIcon from "../components/icons/QRIcon"

const AccountDisplay = () => {
    const accountAddress = useSelectedAddressWithChainIdChecksum()
    const account = useSelectedAccount()
    const [copied, setCopied] = useState(false)
    const copy = async () => {
        await navigator.clipboard.writeText(accountAddress)
        setCopied(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setCopied(false)
    }
    return (
        <button
            type="button"
            className="relative flex flex-col group"
            onClick={copy}
        >
            <span className="text-sm font-bold text-white" data-testid="account-name">
                {formatName(account.name, 18)}
            </span>
            <span className="text-sm truncate text-white flex items-center">
                {formatHash(accountAddress)}
                <CopyIcon />
            </span>
            <CopyTooltip copied={copied} />
        </button>
    )
}

const MainHeader = () => {
    const { chainId } = useSelectedNetwork()
    const { address } = useSelectedAccount()

    const { transactions } = useTransactions()
    const checksumAddress = useSelectedAddressWithChainIdChecksum()
    const history = useHistory()
    return (
        <div
        className="absolute top-0 left-0 z-10 flex flex-col items-start w-full px-5 py-3 bg-header-100 popup-layout"
        style={{ backdropFilter: "blur(4px)" }}
    >
        <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center space-x-3">
                <div className="relative flex flex-col items-start group">
                    <Link
                        to="/accounts"
                        className="transition duration-300"
                        draggable={false}
                        data-testid="navigate-account-link"
                    >
                        <AccountIcon
                            className="transition-transform duration-200 ease-in transform hover:rotate-180"
                            fill={getAccountColor(checksumAddress)}
                        />
                    </Link>
                    <Tooltip
                        className="pointer-events-none absolute bottom-0 -mb-2 transform !translate-x-0 !translate-y-full p-2 rounded-md text-xs font-bold bg-gray-900 text-white"
                        content={
                            <>
                                <div className="border-t-4 border-r-4 border-gray-900 absolute top-0 left-2 w-2 h-2 -mt-2.5 transform -rotate-45 -translate-x-1/2" />
                                <span>My Accounts</span>
                            </>
                        }
                    />
                </div>
                <div className="flex flex-row items-center space-x-1">
                    <AccountDisplay />
                    {/* <Link
                        to="/accounts/menu/receive"
                        draggable={false}
                        onClick={(e) => {
                            e.preventDefault()

                            history.push("/accounts/menu/receive")
                        }}
                        className="p-2 transition duration-300 rounded-full hover:bg-primary-100 hover:text-primary-300"
                    >
                        <QRIcon />
                    </Link> */}
                </div>
            </div>
            <div className="flex flex-row items-center -mr-1 space-x-2">
                {/* <GasPricesInfo /> */}
                <Link
                    to="/settings"
                    draggable={false}
                    onClick={(e) => {
                        e.preventDefault()

                        history.push("/settings")
                    }}
                    className="p-2 transition duration-300 rounded-full hover:bg-primary-100 hover:text-primary-300"
                >
                    {/* <GearIcon /> */}
                    <VectorIcon />
                </Link>
            </div>
        </div>
    </div>
    )
}

export default MainHeader
