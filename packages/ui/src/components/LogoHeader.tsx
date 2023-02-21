import logo from "../assets/exzo-images/images/logo.png"
import { classnames } from "../styles"

const LogoHeader = (props: any) => (
    <div className={classnames("flex flex-row items-center space-x-1 text-white")} >
        <img src={logo} alt="logo" className="w-6 h-6 rounded-md" />
        <span className="font-bold text-2xl">ExzoWallet</span>
    </div>
)

export default LogoHeader
