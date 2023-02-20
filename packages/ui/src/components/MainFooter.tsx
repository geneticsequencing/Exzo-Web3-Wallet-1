import MenuIcon from "./menu/MenuIcon"


const MainFooter = () => {
    return (
        <div className="absolute bottom-0 left-0 z-10 flex flex-col items-start w-full px-7 py-2 bg-header-100 popup-layout"
            style={{ backdropFilter: "blur(4px)" }}>
            <div className="flex flex-row items-center justify-between w-full px-3 py-2.5">
                <MenuIcon to="/home" />
                <MenuIcon to="/dapp_browse" />
                <MenuIcon to="/swap" />
                <MenuIcon to="/transaction_history" />
                <MenuIcon to="/settings" />
            </div>
        </div>
    )
}

export default MainFooter
