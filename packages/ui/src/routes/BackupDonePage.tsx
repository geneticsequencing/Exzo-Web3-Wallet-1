import PopupLayout from "../components/popup/PopupLayout"
import PopupHeader from "../components/popup/PopupHeader"
import LinkButton from "../components/button/LinkButton"
import logo from "../assets/images/logo.svg"
import PopupFooter from "../components/popup/PopupFooter"
import SuccessImg from "../assets/exzo-images/images/success.png"
const BackupDonePage = () => {
    return (
        <PopupLayout
            header={<PopupHeader title="You’re Now Safe!" backButton={false} />}
        >
            <div className="flex flex-col items-center justify-center w-full h-full space-y-6 p-6">
                <span className=" text-center font-base font-semibold text-2xl text-white">
                    You’ve successfully backed your seed phrase.
                </span>
                <div >
                    <img className="w-32" src={SuccessImg} />
                </div>
                <span className="font-base text-center text-sm text-white">
                    You can now continue using ExzoWallet.
                </span>
            </div>
            <div className="w-full p-5">
                <LinkButton location="/" text="Done" lite />
            </div>
        </PopupLayout>
    )
}

export default BackupDonePage
