import LogoIcon from "../../assets/exzo-images/images/logo_icon.png"

const AccountIcon = (props: any) => (
    <div className="rounded-[13px] bg-white w-8 h-8 flex justify-center items-center">
        <img src={LogoIcon} className={props.className} />
    </div>
)

export default AccountIcon
