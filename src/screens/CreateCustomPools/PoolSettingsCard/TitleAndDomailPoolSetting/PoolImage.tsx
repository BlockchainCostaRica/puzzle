import styled from "@emotion/styled";
import { Column } from "@src/components/Flex";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import ImageUpload from "@components/ImageUpload";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PoolImage: React.FC<IProps> = () => {
  const vm = useCreateCustomPoolsVM();
  return (
    <Root>
      <ImageUpload
        onChange={() => null}
        loading={false}
        setLoading={() => null}
        image={vm.logo}
      />
      <SizedBox width={8} />
      <Column>
        <Text weight={500}>Upload the image for the pool</Text>
        <Text size="small" type="secondary">
          JPG or PNG file, up to 1 MB
        </Text>
      </Column>
    </Root>
  );
};
export default observer(PoolImage);
