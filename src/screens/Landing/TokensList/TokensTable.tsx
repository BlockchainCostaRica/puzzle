import styled from "@emotion/styled";
import React, { useState } from "react";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 96px;
  max-width: 560px;
  padding: 32px;
  border-radius: 8px;
  background: white;
`;

const Table = styled.table`
  gap: 0;
  font-family: Roboto, Poppins, sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  text-align: left;
  border-spacing: 0;
  color: #4d5c76;
  border-collapse: collapse;

  th,
  td {
    padding: 0 8px;
    background: #f5f5f5;
    height: 42px;
    box-sizing: border-box;
    border: 1px solid #ebf0f6;
  }

  td {
    height: 30px;
    background: transparent;
  }
`;

const TableScreen: React.FC<IProps> = () => {
  return (
    <Root>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Start date</th>
            <th>Progress</th>
            <th>Task type</th>
          </tr>
        </thead>
        <tbody>
          {/*{.map((v) => (*/}
          {/*  <TableRow key={v.id} v={v} />*/}
          {/*))}*/}
        </tbody>
      </Table>
    </Root>
  );
};

const TableRow: React.FC<{ v: any; level?: number }> = ({ v, level = 0 }) => {
  const isParent = v.children && v.children.length > 0;
  return (
    <>
      <tr key={v.id}>
        <td>Хуй</td>
        <td>Пизда</td>
        <td>Залупа</td>
        <td>{v.taskType}</td>
      </tr>
    </>
  );
};

export default TableScreen;
