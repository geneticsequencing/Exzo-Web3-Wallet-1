type DirectionProps = {
    direction: string
}

const ArrowIcon = (props: DirectionProps) => {
    const direction = props.direction;

    return (
        <div className="flex justify-center items-center w-6 h-6" style={direction === "up" ? { transform: "scaleY(-1)" } : {}}>
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 8L6.5 13M6.5 13L1.5 8M6.5 13L6.5 1" stroke="#00FFA3" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>
    )

}

export default ArrowIcon
