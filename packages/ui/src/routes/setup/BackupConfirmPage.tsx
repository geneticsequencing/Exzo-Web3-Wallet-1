import { FunctionComponent, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

import PageLayout from "../../components/PageLayout"
import Divider from "../../components/Divider"
import Spinner from "../../components/spinner/Spinner"
import classnames from "classnames"
import { Classes } from "../../styles/classes"
import { verifySeedPhrase } from "../../context/commActions"
import { findPositionOfSelectedWord, shuffleArray } from "../../util"
import { useOnMountHistory } from "../../context/hooks/useOnMount"
import { ButtonWithLoading } from "../../components/button/ButtonWithLoading"
import PopupHeader from "../../components/popup/PopupHeader"
import PopupFooter from "../../components/popup/PopupFooter"
import { useBlankState } from "../../context/background/backgroundHooks"
import { closeCurrentTab } from "../../util/window"
import IdleComponent from "../../components/IdleComponent"
import PopupLayout from "../../components/popup/PopupLayout"
import BackIcon from "../../assets/exzo-images/images/back_icon.png"

export interface SeedPhraseWord {
    word: string
    isSelected: boolean
}

const SeedWordsInput: FunctionComponent<{
    words: SeedPhraseWord[]
    value: SeedPhraseWord[]
    onChange: (words: SeedPhraseWord[]) => void
    isReminderConfirm: boolean
}> = ({ words, value, onChange, isReminderConfirm = false }) => {
    const [availableWords, setAvailableWords] = useState([...words])

    const handleWordClick = (
        seedWord: SeedPhraseWord,
        wordIndex: number,
        isInputClick: boolean
    ) => {
        let newValue = [...value]
        let updatedAvailableWords = [...availableWords]

        if (isInputClick) {
            // remove the word from the input
            newValue.splice(wordIndex, 1)
            const wordIndexInWords = findPositionOfSelectedWord(
                updatedAvailableWords,
                seedWord
            )
            updatedAvailableWords[wordIndexInWords].isSelected = false
        } else {
            if (seedWord.isSelected) {
                // find the word in the input and remove it
                const wordIndexInInput = findPositionOfSelectedWord(
                    newValue,
                    seedWord
                )
                newValue.splice(
                    wordIndexInInput,
                    wordIndexInInput !== -1 ? 1 : 0
                )
            } else {
                newValue = [...value, { word: seedWord.word, isSelected: true }]
            }
            updatedAvailableWords[wordIndex].isSelected = !seedWord.isSelected
        }
        setAvailableWords(updatedAvailableWords)
        onChange(newValue)
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className={classnames("px-2 overflow-hidden rounded-3xl bg-container-reveal bg-opacity-20 flex flex-wrap justify-center gap-x-[10px] gap-y-[10px]",
                    isReminderConfirm ? "h-[180px] py-4" :  "h-[224px] py-12")}>
                {value.map((wordObj, index) => (
                    <button
                        type="button"
                        key={`${wordObj.word}_${index}`}
                        className="bg-component-btn-600 text-component-btn-700 rounded-2xl py-2 w-[17%]"
                        style={{ height: "fit-content" }}
                        onClick={() => handleWordClick(wordObj, index, true)}
                    >
                        {wordObj.word}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-[10px] gap-y-[10px]">
                {availableWords.map((wordObj, index) => (
                    <button
                        type="button"
                        key={`${wordObj.word}_${index}`}
                        className={classnames(
                            "py-2 rounded-2xl border w-[18%]",
                            wordObj.isSelected
                                ? "border-transparent bg-body-balances-100 text-white"
                                : "text-component-btn-700 bg-component-btn-600"
                        )}
                        onClick={() => {
                            return handleWordClick(wordObj, index, false)
                        }}
                    >
                        {wordObj.word}
                    </button>
                ))}
            </div>
        </div>
    )
}

// subcomponent
const SeedPhraseBlock = (props: any) => {
    const {
        isReminder,
        verificationError,
        seedWords,
        inputWords,
        onSeedWordsChange,
        isReminderConfirm,
    } = props

    return (
        <div
            className={classnames(
                "flex flex-col text-white text-sm",
                isReminder ? "space-y-6 p-4" : "space-y-8 p-8"
            )}
        >
            <span
                className={classnames(
                    "text-red-500 text-xs",
                    verificationError ? "" : "hidden"
                )}
            >
                verificationError || <>&nbsp;</>
            </span>
            <SeedWordsInput
                words={seedWords}
                value={inputWords}
                onChange={(words) => onSeedWordsChange(words)}
                isReminderConfirm={isReminderConfirm}
            />
        </div>
    )
}

const BackupConfirmPage = () => {
    const { isUnlocked } = useBlankState()!
    useEffect(() => {
        if (!isUnlocked) {
            alert(
                "For security reasons the extension is now blocked. Login again in the extension to continue with the backup process."
            )
            closeCurrentTab()
        }
    }, [isUnlocked])
    const history: any = useOnMountHistory()
    const { seedPhrase, isReminder, password } = history.location.state
    const backLink = isReminder ? "/reminder" : "/setup/create/notice"
    const doneLink = isReminder ? "/reminder/backup/done" : "/setup/done"
    const [inputWords, setInputWords] = useState<SeedPhraseWord[]>([])
    const [isVerificationInProgress, setIsVerificationInProgress] =
        useState<boolean>(false)
    const [verificationError, setVerificationError] = useState<string>("")
    const seedWords = useMemo(() => {
        let wordsForSeedPhrase: SeedPhraseWord[] = []
        const words = seedPhrase.split(" ")
        shuffleArray(words)
        wordsForSeedPhrase = []
        words.forEach((word: string) => {
            wordsForSeedPhrase.push({
                word,
                isSelected: false,
            })
        })
        return wordsForSeedPhrase
    }, [seedPhrase])

    const isPhraseValid = () => {
        let inputPhrase: string[] = []
        inputWords.forEach((wordObj) => {
            inputPhrase.push(wordObj.word)
        }, "")
        return seedPhrase === inputPhrase.join(" ")
    }

    const confirmSeedPhrase = async () => {
        setIsVerificationInProgress(true)
        try {
            const isSeedPhraseVerified = await verifySeedPhrase(
                seedPhrase,
                password
            )
            if (isSeedPhraseVerified) {
                setVerificationError("")
                setIsVerificationInProgress(false)
                history.push({ pathname: doneLink })
            } else {
                setVerificationError("Verification failed")
            }
        } catch {
            setVerificationError("Error verificating the seed phrase")
        }
        setIsVerificationInProgress(false)
    }

    return (
        <IdleComponent>
            {isReminder ? (
                // reminder view in app
                <PopupLayout
                    header={
                        <PopupHeader title="Confirm Seed Phrase" keepState isReminderConfirm={true} />
                    }
                >
                    <SeedPhraseBlock
                        isReminder={true}
                        isReminderConfirm={true}
                        verificationError={verificationError}
                        seedWords={seedWords}
                        inputWords={inputWords}
                        onSeedWordsChange={(words: any) => setInputWords(words)}
                    />
                    <div className="w-full p-6">
                        <ButtonWithLoading
                            label="Confirm"
                            isLoading={isVerificationInProgress}
                            onClick={confirmSeedPhrase}
                            disabled={!isPhraseValid()}
                        />
                    </div>
                </PopupLayout>
            ) : (
                // browser tab version during installation
                <PageLayout
                    screen={isReminder}
                    header={!isReminder}
                    maxWidth={isReminder ? "" : ""}
                    className={"text-center relative"}
                    step={3}
                    backClick={<Link
                        to={{
                            pathname: backLink,
                            state: { seedPhrase, password },
                        }}
                        className="absolute left-4 top-4 px-6 py-2 flex justify-center items-center hover:border-border-300 hover:border-2 rounded-sm"
                        draggable={false}
                    >
                        <img className="w-6 h-4" src={BackIcon} />
                    </Link>}
                >
                    <div className="mt-6 text-3xl font-bold font-title text-white">
                        Re-enter your Secret Phrase
                    </div>
                    <div className="text-xxs text-txt-check my-5">
                        Select the words in your recovery phrase in their correct order.
                    </div>
                    <div className="px-24 flex flex-col w-full relative">
                        <SeedPhraseBlock
                            isReminder={isReminder}
                            verificationError={verificationError}
                            seedWords={seedWords}
                            inputWords={inputWords}
                            onSeedWordsChange={(words: any) => setInputWords(words)}
                        />
                        <ButtonWithLoading
                            label="Continue"
                            isLoading={isVerificationInProgress}
                            onClick={confirmSeedPhrase}
                            buttonClass={classnames(Classes.confrimButton, 
                                (!isPhraseValid() ||
                                isVerificationInProgress) &&
                                "opacity-50 pointer-events-none")}
                            disabled={!isPhraseValid() ||
                                isVerificationInProgress}
                        ></ButtonWithLoading>
                    </div>
                </PageLayout>
            )}
        </IdleComponent>
    )
}

export default BackupConfirmPage
