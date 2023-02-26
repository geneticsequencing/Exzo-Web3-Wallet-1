import { useEffect, useState } from "react"

import Confetti from "react-dom-confetti"

import LogoHeader from "../../components/LogoHeader"
import PageLayout from "../../components/PageLayout"

import logo from "../../assets/images/logo.svg"
import { completeSetup } from "../../context/commActions"
import { useOnMountHistory } from "../../context/hooks/useOnMount"
import SuccessImg from "../../assets/exzo-images/images/success.png"

const SetupDonePage = () => {
    const history: any = useOnMountHistory()
    const [confettiActive, setConfettiActive] = useState(false)

    useEffect(() => {
        setConfettiActive(true)

        let sendNotification = true
        if (history.location && history.location.state) {
            sendNotification = history.location.state.sendNotification
        }
        completeSetup(sendNotification)
    }, [history])

    const config = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 70,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: "10px",
        height: "10px",
        perspective: "500px",
        colors: ["#000", "#333", "#666"],
    }
    return (
        <>
            <div className="absolute z-50 w-full h-full flex flex-row items-center justify-center overflow-hidden">
                <Confetti active={confettiActive} config={config} />
            </div>
            <PageLayout centered className="relative overflow-hidden" step={4}>
                <div className="flex flex-col items-center relative py-8 z-10">
                    <div className="flex flex-col items-center mb-12 mt-4 space-y-6">
                    <div className="mt-6 text-3xl font-bold font-title text-white">
                        Congrats!
                    </div>
                    <div className="text-txt-check text-base my-5">
                        <div>Your Exzo Wallet is now ready please continue in the</div>
                        <div className="text-center">browser extension.</div>
                    </div>
                    </div>
                    <div >
                        <img className="w-52" src={SuccessImg} />
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
        </>
    )
}

export default SetupDonePage
