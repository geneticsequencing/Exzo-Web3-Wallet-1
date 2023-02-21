import classnames from "classnames"

const Divider = ({ className }: { className?: string }) => (
    <hr
        className={classnames(
            className,
            "w-full border-b-1 border-white"
        )}
    />
)

export default Divider
