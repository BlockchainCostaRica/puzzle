import styled from "@emotion/styled";
import React, { useState } from "react";
import { Row } from "@components/Flex";
import { ReactComponent as BalanceIcon } from "@src/assets/icons/balance.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import centerEllipsis from "@src/utils/centerEllipsis";
import { ReactComponent as ArrowIcon } from "@src/assets/icons/arrowRightBorderless.svg";
import * as identityImg from "identity-img";
import { useStores } from "@stores";

interface IProps {}

const Root = styled(Row)`
  align-items: center;
  height: fit-content;
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

const LoggedInAccountInfo: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;
  const avatar = address && identityImg.create(address, { size: 24 * 3 });
  const [balancesOpened, setBalancesOpened] = useState(false);
  const [accountOpened, setAccountOpened] = useState(false);

  return (
    <Root>
      <Row alignItems="center" style={{ cursor: "pointer" }}>
        <BalanceIcon />
        <SizedBox width={8} />
        <Text style={{ color: "#7075E9" }}>$ 8,214.16</Text>
      </Row>
      <SizedBox width={24} />
      <AddressContainer onClick={() => setAccountOpened((v) => !v)}>
        <img className="avatar" src={avatar!} alt="avatar" />
        <Text>{centerEllipsis(address ?? "", 6)}</Text>
        <SizedBox width={10} />
        <ArrowIcon
          style={{ transform: `rotate(${accountOpened ? "-" : ""}90deg)` }}
        />
      </AddressContainer>
    </Root>
  );
};
export default LoggedInAccountInfo;
