import { FunctionComponent } from "react"

import { Link } from "react-router-dom"
import Divider from "../../components/Divider"
import { Classes, classnames } from "../../styles/classes"

import crossIcon from "../../assets/images/icons/cross.svg"

import checkmarkIcon from "../../assets/images/icons/checkmark.svg"
import PageLayout from "../../components/PageLayout"
import { useCheckUserIsOnboarded } from "../../context/hooks/useCheckUserIsOnboarded"
import LogoWhite  from "../../assets/exzo-images/images/logo_white_big.png"
import PlusIcon from "../../assets/exzo-images/images/plus.png"
import FolderIcon from "../../assets/exzo-images/images/Vector.png"

const SetupOption: FunctionComponent<{
    title: string
    description: string
    icon: string
    linkTo: string
    linkLabel: string
}> = ({ title, description, icon, linkTo, linkLabel }) => (
    <div className="relative flex flex-col items-start flex-1 p-6 ">

        <Link
            to={linkTo}
            className={classnames(Classes.button, "w-full")}
            draggable={false}
        >
            {linkLabel}
        </Link>
    </div>
)

const SetupPage = () => {
    // if the onboarding is ready the user shoulnd't do it again.
    useCheckUserIsOnboarded()

    return (
        <PageLayout className="relative" header welcomePage={true}>
            <div >
                <div className="flex justify-center  ">
                    <img className="w-[100px]" src={LogoWhite}></img>
                </div>
                <span className="my-4 text-5xl font-normal font-[CarbonText-Regular] text-txt-logo">
                    EXZO WALLET
                </span>

            </div>
            <div className="flex w-full p-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4 mt-20">
                    <Link
                        to={"/setup/create"}
                        className="flex flex-col flex-1 justify-center text-2xl pt-10  text-white border-r-2 border-border-200 hover:opacity-60"
                        draggable={false}
                    >
                        <div className="flex justify-center items-center">
                            Create a New Wallet
                        </div>
                        <div className="flex items-center justify-center w-full p-10">
                            <img className="w-12 h-12" src={PlusIcon} alt="" />
                        </div>
                    </Link>
                    <Link
                        to={"/setup/import"}
                        className="flex flex-col flex-1 justify-center text-2xl pt-10 text-white hover:opacity-60"
                        draggable={false}
                    >
                        <div className="flex justify-center items-center">
                            Access Existing Wallet
                        </div>
                        <div className="flex items-center justify-center w-full p-10">
                            <img className="w-12 h-12" src={FolderIcon} alt="" />
                        </div>
                    </Link>
            </div>
        </PageLayout>
    )
}

export default SetupPage
