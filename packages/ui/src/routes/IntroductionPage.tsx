import { Link } from "react-router-dom"

import { Classes } from "../styles/classes"
import LogoHeader from "../components/LogoHeader"
import PageLayout from "../components/PageLayout"
import logo from "../assets/images/logo.svg"
import LogoWhite  from "../assets/exzo-images/images/logo_white_big.png"

const IntroductionPage = () => (
    <PageLayout centered className="relative overflow-hidden" welcomePage={true}>
        <div className="flex flex-col items-center relative z-10">
            <div>
                <div className="flex justify-center  ">
                    <img className="w-[100px]" src={LogoWhite}></img>
                </div>
                <span className="my-4 text-5xl font-normal font-[CarbonText-Regular] text-txt-logo">
                    EXZO WALLET
                </span>
            </div>
            <div className="flex w-full p-6 space-y-6 flex-col md:space-y-6 md:space-x-4">
                <div className="flex flex-col items-center space-y-6">
                    <div className="flex flex-col md:flex-row items-center space-x-1 w-52 md:w-full mx-auto text-white text-sm text-center">
                        <span>Have a transfer to make?</span>
                        <span>Reclaim your privacy with us.</span>
                    </div>
                </div>
                <Link to="/setup" className={Classes.confrimButton}>
                    Get Started
                </Link>
            </div>
        </div>
        {/* <div
            className="absolute w-64 h-64 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5"
            style={{
                color: "blue",
                background: `url(${logo})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        /> */}
    </PageLayout>
)

export default IntroductionPage
