import styled from "@emotion/styled";
import React, { HTMLAttributes, useState } from "react";
import { ReactComponent as SwapIcon } from "@src/assets/icons/swap.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import { useTradeVM } from "@screens/TradeInterface/TradeVM";
import { useNavigate } from "react-router-dom";
import { Loading } from "@components/Loading";

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
      <Text>
        {!vm.synchronizing ? (
          `1 ${vm.token0?.symbol} = ~ ${vm.price?.toFormat(4) ?? "—"} ${
            vm.token1?.symbol
          }`
        ) : (
          <Loading />
        )}
      </Text>

      <SizedBox width={16} />
    </Root>
  );
};
export default SwitchTokensButton;
