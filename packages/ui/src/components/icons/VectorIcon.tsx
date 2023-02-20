import { FunctionComponent } from "react"
import classnames from "classnames"
const VectorIcon: FunctionComponent<{ className?: string }> = ({
    className,
}) => {
    return (
        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 0.75C0.585786 0.75 0.25 1.08579 0.25 1.5C0.25 1.91421 0.585786 2.25 1 2.25H15C15.4142 2.25 15.75 1.91421 15.75 1.5C15.75 1.08579 15.4142 0.75 15 0.75H1Z" fill="white" />
            <path d="M1 6.75C0.585786 6.75 0.25 7.08579 0.25 7.5C0.25 7.91421 0.585786 8.25 1 8.25H15C15.4142 8.25 15.75 7.91421 15.75 7.5C15.75 7.08579 15.4142 6.75 15 6.75H1Z" fill="white" />
            <path d="M1 12.75C0.585786 12.75 0.25 13.0858 0.25 13.5C0.25 13.9142 0.585786 14.25 1 14.25H15C15.4142 14.25 15.75 13.9142 15.75 13.5C15.75 13.0858 15.4142 12.75 15 12.75H1Z" fill="white" />
        </svg>

    )
}

export default VectorIcon
