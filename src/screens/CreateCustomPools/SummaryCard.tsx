import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { observer } from "mobx-react-lite";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import { Row } from "@src/components/Flex";
import Divider from "@src/components/Divider";

interface IProps {}

const Root = styled.div`
  display: none;
  @media (min-width: calc(880px + 40px)) {
    display: flex;
  }
  flex-direction: column;
  margin-left: 40px;
`;

const SummaryCard: React.FC<IProps> = () => {
  const vm = useCreateCustomPoolsVM();
  const data = vm.poolsAssets.reduce<{ name: string; data: number }[]>(
    (acc, { asset, share }) => [...acc, { name: asset.symbol, data: share }],
    []
  );

  return (
    <Root>
      <Text type="secondary" weight={500}>
        Summary
      </Text>
      <SizedBox height={8} />
      <Card
        style={{
          width: 258,
          height: 232,
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Row justifyContent="center">
          <Donut />
        </Row>
        <SizedBox height={24} />
        <Divider />
        <SizedBox height={14} />
        <Text type="secondary" fitContent>
          Max to provide
        </Text>
        <Text weight={500} fitContent>
          $0.00
        </Text>
      </Card>
    </Root>
  );
};
export default observer(SummaryCard);

const Donut = () => (
  <svg
    width="81"
    height="80"
    viewBox="0 0 81 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40.5 2.5C48.4192 2.5 56.1352 5.00706 62.5419 9.66186C68.9487 14.3167 73.7174 20.8802 76.1646 28.4119L69.0317 30.7295C67.074 24.7042 63.259 19.4533 58.1336 15.7295C53.0081 12.0056 46.8354 10 40.5 10V2.5Z"
      fill="#00FEB5"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M76.1646 28.4119C78.6118 35.9435 78.6118 44.0565 76.1646 51.5881C73.7174 59.1198 68.9487 65.6833 62.5419 70.3382L58.1335 64.2705C63.259 60.5467 67.074 55.2958 69.0317 49.2705C70.9894 43.2452 70.9894 36.7548 69.0317 30.7295L76.1646 28.4119Z"
      fill="#C6C9F4"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M62.5419 70.3381C56.1352 74.9929 48.4192 77.5 40.5 77.5C32.5808 77.5 24.8648 74.9929 18.458 70.3381L22.8664 64.2705C27.9919 67.9943 34.1646 70 40.5 70C46.8354 70 53.0081 67.9944 58.1336 64.2705L62.5419 70.3381Z"
      fill="#C6C9F4"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M18.4581 70.3381C12.0513 65.6833 7.28255 59.1198 4.83538 51.5881C2.38821 44.0565 2.38821 35.9435 4.83538 28.4119L11.9683 30.7295C10.0106 36.7548 10.0106 43.2452 11.9683 49.2705C13.926 55.2958 17.741 60.5467 22.8664 64.2705L18.4581 70.3381Z"
      fill="#C6C9F4"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M4.83538 28.4119C7.28256 20.8802 12.0513 14.3167 18.4581 9.66186C24.8648 5.00706 32.5808 2.5 40.5 2.5V10C34.1646 10 27.9919 12.0056 22.8664 15.7295C17.741 19.4533 13.926 24.7042 11.9683 30.7295L4.83538 28.4119Z"
      fill="#C6C9F4"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
);
