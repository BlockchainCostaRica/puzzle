import React from "react";
import { IDialogPropTypes } from "rc-dialog/lib/IDialogPropTypes";
import Dialog from "@components/Dialog/Dialog";
import { Column } from "../Flex";
import { ReactComponent as SuccessIcon } from "@src/assets/icons/successLarge.svg";
import { ReactComponent as ErrorIcon } from "@src/assets/icons/errorLarge.svg";
import { ReactComponent as WarningIcon } from "@src/assets/icons/warningLarge.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Button from "@components/Button";
import { AccountStore } from "@stores";

export interface IDialogNotificationProps extends IDialogPropTypes {
  title: string;
  description?: string;
  type?: "success" | "error" | "warning";
  buttons?: React.FC[];
  buttonsDirection?: "row" | "column";
}

const Root = styled(Column)`
  text-align: center;

  & > .title {
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }
`;

const ButtonsContainer = styled.div<{ direction?: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? "column"};
  width: 100%;
  margin: -4px;

  & > * {
    ${({ direction }) =>
      direction === "row" ? "margin-right: 4px" : "margin: 4px"}
  }
`;

const DialogNotification: React.FC<IDialogNotificationProps> = ({
  title,
  description,
  type = "success",
  buttonsDirection = "column",
  buttons = [],
  ...rest
}) => {
  return (
    <Dialog {...rest}>
      <Root style={{}} alignItems="center" crossAxisSize="max">
        <SizedBox height={32} />
        {type === "success" && <SuccessIcon />}
        {type === "error" && <ErrorIcon />}
        {type === "warning" && <WarningIcon />}

        <SizedBox height={28} />
        <Text className="title">{title}</Text>
        {description && (
          <Text style={{ marginTop: 8 }} size="medium" type="secondary">
            {description}
          </Text>
        )}
        <SizedBox height={16} />
        {buttons.length > 0 && (
          <ButtonsContainer style={{ flexDirection: buttonsDirection }}>
            {buttons?.map((Component, index) => (
              <Component key="index" />
            ))}
          </ButtonsContainer>
        )}
        <SizedBox height={24} />
      </Root>
    </Dialog>
  );
};

type TBuildSuccessLiquidityDialogParamsProps = {
  accountStore: AccountStore;
  txId: string;
  poolId: string;
};

export const buildSuccessLiquidityDialogParams = ({
  accountStore,
  txId,
  poolId,
}: TBuildSuccessLiquidityDialogParamsProps): IDialogNotificationProps => {
  const txLink = `${accountStore.EXPLORER_LINK}/tx/${txId}`;
  const poolLink = `/${
    (accountStore.ROUTES.invest as Record<string, string>)[poolId]
  }`;
  const pool = accountStore.rootStore.poolsStore.pools.find(
    ({ id }) => id === poolId
  );
  return {
    title: "Successfully provided",
    description: `Liquidity successfully provided to the ${pool?.name}. You can track your reward on the pool page.`,
    type: "success",
    buttons: [
      () => (
        <Link to={poolLink} style={{ width: "100%" }}>
          <Button size="medium" fixed>
            Go to the pool page
          </Button>
        </Link>
      ),
      () => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={txLink}
          style={{ width: "100%" }}
        >
          <Button key="explorer" size="medium" kind="secondary" fixed>
            View on Waves Explorer
          </Button>
        </a>
      ),
    ],
  };
};

type TBuildErrorLiquidityDialogParamsProps = {
  title: string;
  description: string;
  onTryAgain: () => void;
};

export const buildErrorLiquidityDialogParams = ({
  title,
  description,
  onTryAgain,
}: TBuildErrorLiquidityDialogParamsProps): IDialogNotificationProps => {
  return {
    title,
    description,
    type: "error",
    buttons: [
      () => (
        <Button size="medium" fixed onClick={onTryAgain}>
          Try again
        </Button>
      ),
    ],
  };
};
type TBuildWarningLiquidityDialogParamsProps = {
  title: string;
  description: string;
  onContinue: () => void;
  continueText: string;
  onCancel: () => void;
};

export const buildWarningLiquidityDialogParams = ({
  title,
  description,
  onContinue,
  continueText,
  onCancel,
}: TBuildWarningLiquidityDialogParamsProps): IDialogNotificationProps => {
  return {
    title,
    description,
    type: "warning",
    buttonsDirection: "row",
    buttons: [
      () => (
        <Button size="medium" fixed onClick={onCancel} kind="secondary">
          Cancel
        </Button>
      ),
      () => (
        <Button size="medium" fixed onClick={onContinue}>
          {continueText}
        </Button>
      ),
    ],
  };
};
export default DialogNotification;
