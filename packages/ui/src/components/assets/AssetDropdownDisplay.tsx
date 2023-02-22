import { formatUnits } from "@ethersproject/units"
import { FC } from "react"
import classnames from "classnames"
import { formatNumberLength } from "../../util/formatNumberLength"
import { formatRounded } from "../../util/formatRounded"
import TokenLogo from "../token/TokenLogo"
import { BigNumber } from "@ethersproject/bignumber"
import { TokenWithBalance } from "../../context/hooks/useTokensList"

interface AssetDropdownDisplayProps {
    selectedAsset?: TokenWithBalance
    customAmount?: BigNumber
    displayIcon?: boolean
    assetBalanceClassName?: string
    assetBalance?: string
    swapPage?: boolean
}

const AssetDropdownDisplay: FC<AssetDropdownDisplayProps> = ({
    selectedAsset,
    displayIcon,
    customAmount,
    assetBalance,
    assetBalanceClassName,
    swapPage,
}) => {
    console.log(selectedAsset)
    return selectedAsset ? (
        <div className="flex flex-row items-center">
            <div className="rounded-full p-1 mr-[14px] bg-white">
                {displayIcon && (
                    <TokenLogo
                        logo={selectedAsset.token.logo}
                        name={selectedAsset.token.name}
                        className=""
                    />
                )}
            </div>
            <div>
                <div className="text-base truncate font-semibold text-body-600">
                    {(selectedAsset.token.name).length  > 10 ? (selectedAsset.token.name).slice(0,10) + "...": selectedAsset.token.name}
                </div>
                <div className="text-body-700 text-xs">
                    {!customAmount && (
                        <span
                            title={assetBalance}
                            className={classnames(
                                "mt-1 truncate",
                                assetBalanceClassName
                            )}
                        >
                            {assetBalance}
                        </span>
                    )}
                    <span className="font-semibold ml-2">
                        {selectedAsset.token.symbol}
                    </span>
                </div>
                {customAmount && (
                    <span
                        className="text-base font-semibold ml-auto mr-2 truncate max-w-lg"
                        title={customAmount?.toString()}
                        style={{ maxWidth: "8.5rem" }}
                    >
                        {formatNumberLength(
                            formatRounded(
                                formatUnits(
                                    customAmount,
                                    selectedAsset.token.decimals
                                ),
                                9
                            ),
                            12
                        )}
                    </span>
                )}
            </div>
        </div>
    ) : (
        <div className="flex flex-col justify-center w-full">
            <div className="text-base font-semibold text-white">Select...</div>
        </div>
    )
}

export default AssetDropdownDisplay
