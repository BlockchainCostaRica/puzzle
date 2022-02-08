import styled from "@emotion/styled";
import React, { HTMLAttributes, useState } from "react";
import { ReactComponent as SwapIcon } from "@src/assets/icons/swap.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import { useTradeVM } from "@screens/TradeInterface/TradeVM";
import { useNavigate } from "react-router-dom";
import { Loading } from "@components/Loading";
import { TOKENS } from "@src/constants";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Root = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin: 16px 0;

  .icon {
    transition: 0.4s;
  }
`;

const SwitchTokensButton: React.FC<IProps> = ({ ...rest }) => {
  const vm = useTradeVM();
  const { token0, token1, price } = vm;
  const navigate = useNavigate();
  const [switched, setSwitched] = useState(false);
  const handleSwitch = () => {
    vm.switchTokens();
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("asset0", vm.assetId0);
    urlSearchParams.set("asset1", vm.assetId1);
    navigate({
      pathname: window.location.pathname,
      search: `?${urlSearchParams.toString()}`,
    });
    setSwitched((v) => !v);
  };
  const stablesIds = [TOKENS.W.USDN.assetId, TOKENS.W.USDT!.assetId];
  const rate = stablesIds.some((assetId) => assetId === token0?.assetId)
    ? `1 ${token1?.symbol} = ~ ${price.pow(-1)?.toFormat(4) ?? "—"} ${
        token0?.symbol
      }`
    : `1 ${token0?.symbol} = ~ ${price?.toFormat(4) ?? "—"} ${token1?.symbol}`;
  return (
    <Root {...rest} onClick={handleSwitch}>
      <SwapIcon
        className="icon"
        style={{
          transform: switched ? "rotate(360deg)" : "rotate(0)",
          margin: "0 8px",
        }}
      />
      <SizedBox width={8} />
      <Text>{!vm.synchronizing ? rate : <Loading />}</Text>

      <SizedBox width={16} />
    </Root>
  );
};
export default SwitchTokensButton;
