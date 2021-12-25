import styled from "@emotion/styled";
import React, { useState } from "react";
import { Row } from "@components/Flex";
import { ReactComponent as BalanceIcon } from "@src/assets/icons/balance.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import centerEllipsis from "@src/utils/centerEllipsis";
import arrowIcon from "@src/assets/icons/arrowRightBorderless.svg";
import * as identityImg from "identity-img";
import { useStores } from "@stores";

interface IProps {}

const Root = styled(Row)`
  align-items: center;
  height: fit-content;
  .balances {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  box-sizing: border-box;
  border: 1px solid #f1f2fe;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background: #f1f2fe;
  }

  .avatar {
    transition: 0.4s;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const ArrowIcon = styled.img<{ expanded: boolean }>`
  transition: 0.4s;
  transform: ${({ expanded }) =>
    expanded ? "rotate(-90deg)" : "rotate(90deg)"};
`;

const LoggedInAccountInfo: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;
  const avatar = address && identityImg.create(address, { size: 24 * 3 });
  // const [balancesOpened, setBalancesOpened] = useState(false);
  const [accountOpened, setAccountOpened] = useState<boolean>(false);

  return (
    <Root>
      <div
        className="balances"
        // onClick={() => setBalancesOpened((v) => !v)}
      >
        <BalanceIcon />
        <SizedBox width={8} />
        <Text style={{ color: "#7075E9" }}>$ 8,214.16</Text>
      </div>
      <SizedBox width={24} />
      <AddressContainer onClick={() => setAccountOpened((v) => !v)}>
        <img className="avatar" src={avatar!} alt="avatar" />
        <Text>{centerEllipsis(address ?? "", 6)}</Text>
        <SizedBox width={10} />
        <ArrowIcon src={arrowIcon} alt="arrow" expanded={accountOpened} />
      </AddressContainer>
    </Root>
  );
};
export default LoggedInAccountInfo;
