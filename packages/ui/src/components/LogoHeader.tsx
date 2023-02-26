import logo from "../assets/exzo-images/images/logo_white_small.png"
import { classnames } from "../styles"

const LogoHeader = (props: any) => (
    <div className={classnames("flex flex-row items-center space-x-1 text-white")} >
        <img src={logo} alt="logo" className="rounded-md w-[34px] h-[38px]" />
        <div className="pb-1.5"><span className="font-normal text-xl font-[CarbonText-Regular]">EXZO WALLET</span></div><span className="border-[1px] rounded-3xl border-white px-[14px] py-1">Beta</span>
    </div>
)

export default LogoHeader
