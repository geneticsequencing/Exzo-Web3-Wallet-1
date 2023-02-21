import { FunctionComponent } from "react"
import { Classes, classnames } from "../../styles/classes"
type ClickableTextProps = {
    children: string | React.ReactNode
    onClick: React.MouseEventHandler
    className?: string
}

const ClickableText: FunctionComponent<ClickableTextProps> = ({
    children,
    className,
    onClick,
}) => {
    return (
        <button
            type="button"
            className={classnames(Classes.clickableText, className, "text-body-balances-200")}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default ClickableText
