import { FunctionComponent } from "react"
import MainBackgroundImage from "../assets/exzo-images/images/main_bg.png"
import classnames from "classnames"

const FullCenterContainer: FunctionComponent<{
    centered?: boolean
    screen?: boolean
    children: React.ReactNode
    InitialPageStatus?: boolean
}> = ({ children, centered = false, screen = false, InitialPageStatus = false }) => {
    return (
        <div
            className='w-full min-h-full flex relative bg-black'
            style={screen ? {} : { height: "fit-content" }}
        >
            {
                !InitialPageStatus &&
                    <img className="absolute w-full h-full left-0 top-0" src={MainBackgroundImage}/>
            }
            <div
                className={classnames(
                    "flex flex-col flex-1 md:flex-0 z-10",
                    InitialPageStatus  ? "bg-container-100" : "",
                    !screen && "px-2",
                    "mx-auto",
                    centered ? "my-auto" : !screen ? "m-auto" : ""
                )}
            >
                {children}
            </div>
        </div>
    )
}

export default FullCenterContainer
