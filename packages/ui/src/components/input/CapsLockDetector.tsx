import { useState, useEffect } from "react"
import { classnames } from "../../styles"

type ChildrenParams = {
    isCapsLock: boolean
}

type CapsLockDetectorProps = {
    children: (params: ChildrenParams) => React.ReactNode
    seedImportStatus?: boolean
}

const CapsLockDetector = ({ children, seedImportStatus }: CapsLockDetectorProps) => {
    const [isCapsLock, setIsCapsLock] = useState(false)

    useEffect(() => {
        const cbUp = (e: KeyboardEvent) => {
            // It can return undefined so we have to make sure it's the correct value
            if (e.getModifierState("CapsLock") === false) {
                setIsCapsLock(false)
            }
        }
        const cbDown = (e: KeyboardEvent) => {
            if (e.getModifierState("CapsLock")) {
                setIsCapsLock(true)
            }
        }

        window.addEventListener("keydown", cbDown)
        window.addEventListener("keyup", cbUp)

        return () => {
            window.removeEventListener("keydown", cbDown)
            window.removeEventListener("keyup", cbUp)
        }
    }, [])

    return <div className={classnames(seedImportStatus? "w-[17%]" : "w-full")}>{children({ isCapsLock })}</div>
}

export default CapsLockDetector
