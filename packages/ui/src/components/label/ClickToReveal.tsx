import { FunctionComponent } from "react"
import lockIcon from "../../assets/images/icons/lock.svg"

const ClickToReveal: FunctionComponent<{
    hiddenText: string
    revealMessage: string
    revealed: boolean
    onClick: () => void
}> = ({ hiddenText, revealMessage, revealed, onClick }) => (
    <div className="relative p-8 overflow-hidden text-white rounded-md bg-body-balances-100">
        {!revealed ? (
            <button
                type="button"
                onClick={onClick}
                className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-full space-y-2 bg-opacity-50 bg-body-balances-100"
            >
                <img src={lockIcon} alt="lock" className="w-5 h-5" />
                <span className="font-bold text-white">{revealMessage}</span>
            </button>
        ) : null}
        <span
            className="font-bold break-words allow-select text-body-balances-200"
            style={revealed ? {} : { filter: "blur(0.15rem)" }}
        >
            {hiddenText}
        </span>
    </div>
)

export default ClickToReveal
