import PopupHeader from "../components/popup/PopupHeader"
import PopupLayout from "../components/popup/PopupLayout"
import { BigNumber } from "@ethersproject/bignumber"
import { SwapQuote } from "@block-wallet/background/controllers/SwapController"
import { Token } from "@block-wallet/background/controllers/erc-20/Token"
import { useOnMountHistory } from "../context/hooks/useOnMount"

//assets
import Image1 from "../assets/exzo-images/images/screenshot-opensea.io-2023.021.png"
import Image2 from "../assets/exzo-images/images/unnamed-33.png"
import Image3 from "../assets/exzo-images/images/unnamed1.png"
import Image4 from "../assets/exzo-images/images/AnyConv1.png"
import Image5 from "../assets/exzo-images/images/Yuga-Labs-Bored-Ape-Yacht-Club-79401.png"
import Image6 from "../assets/exzo-images/images/Manager-Noet-All1.png"

interface SwapPageLocalState {
    fromToken?: Token
    swapQuote?: SwapQuote
    toToken?: Token
    fromAssetPage?: boolean
    amount?: string
}

interface SwapState {
    tokenFrom?: Token
    tokenTo?: Token
    bigNumberAmount?: BigNumber
}

const CollectiblesPage = () => {
    const history = useOnMountHistory()
    const {
        fromToken,
        swapQuote,
        toToken,
        amount: defaultAmount,
        fromAssetPage,
    } = (history.location.state || {}) as SwapPageLocalState

    return (
        <PopupLayout
            header={
                <PopupHeader
                    title="Swap"
                    close="/"
                    networkIndicator
                    keepState
                    onBack={() =>
                        fromAssetPage
                            ? history.push({
                                  pathname: "/asset/details"
                              })
                            : history.push("/home")
                    }
                />
            }
        >
            <div className="p-4">
                <div className="text-white text-2xl p-6 pt-2">Collectibles</div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <img className="w-full h-full" src={Image1} />
                        <div className="absolute bottom-0 bg-body-collectibles-100 text-white font-bold backdrop-blur-[30px] flex justify-between  w-full rounded-b-[8px] p-1.5 text-[10px]">
                            <div>Clone X</div>
                            <div>#9231</div>
                        </div>    
                    </div>
                    <div className="relative">
                        <img className="w-full h-full" src={Image2} />
                        <div className="absolute bottom-0 bg-body-collectibles-100 text-white font-bold backdrop-blur-[30px] flex justify-between  w-full rounded-b-[8px] p-1.5 text-[10px]">
                            <div>Bored Ape</div>
                            <div>#91</div>
                        </div>    
                    </div>
                    <div className="relative">
                        <img className="w-full h-full" src={Image3} />
                        <div className="absolute bottom-0 bg-body-collectibles-100 text-white font-bold backdrop-blur-[30px] flex justify-between  w-full rounded-b-[8px] p-1.5 text-[10px]">
                            <div>Futuristic Roberts</div>
                            <div>#10000</div>
                        </div>    
                    </div>
                    <div className="relative">
                        <img className="w-full h-full" src={Image4} />
                        <div className="absolute bottom-0 bg-body-collectibles-100 text-white font-bold backdrop-blur-[30px] flex justify-between  w-full rounded-b-[8px] p-1.5 text-[10px]">
                            <div>Mutant Ape</div>
                            <div>#1179</div>
                        </div>    
                    </div>
                    <div className="relative">
                        <img className="w-full h-full" src={Image5} />
                        <div className="absolute bottom-0 bg-body-collectibles-100 text-white font-bold backdrop-blur-[30px] flex justify-between  w-full rounded-b-[8px] p-1.5 text-[10px]">
                            <div>Bored Ape</div>
                            <div>#79</div>
                        </div>    
                    </div>
                    <div className="relative">
                        <img className="w-full h-full" src={Image6} />
                        <div className="absolute bottom-0 bg-body-collectibles-100 text-white font-bold backdrop-blur-[30px] flex justify-between  w-full rounded-b-[8px] p-1.5 text-[10px]">
                            <div>Mutant Ape</div>
                            <div>#1165</div>
                        </div>    
                    </div>
                </div>
            </div>
        </PopupLayout>
    )
}

export default CollectiblesPage