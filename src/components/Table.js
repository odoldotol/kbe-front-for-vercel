import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import { useSelector } from "react-redux";
import axios from "axios";

const Styles = styled.div`
  padding: 1rem;
  table {
    width: 100%;
    margin: 25px auto;
    border-collapse: collapse;
    border: 1px solid #eee;
    border-bottom: 2px solid #4154f1;

    tr {
      &:hover {
        background: #f4f4f4;

        td {
          color: #555;
        }
      }
    }
    th,
    td {
      color: #999;
      border: 1px solid #eee;
      padding: 12px 35px;
      border-collapse: collapse;
    }
    th {
      background: #4154f1;
      color: #fff;
      text-transform: uppercase;
      font-size: 12px;
      &.last {
        border-right: none;
      }
    }
  }
`;

function Table() {
  const [transactionList, setTransactionList] = useState([]);
  const walletAddr = useSelector((state) => state.walletReducer).walletAddr;

  useEffect(() => {
    const url = `http://localhost:4000/items/marketlogs/${walletAddr}`;
    axios.get(url).then((res) => {
      let transactionData = res.data.data;
      transactionData = transactionData.map((tx) => {
        return {
          Type: checkType(tx.status_code),
          Item: tx.nftId,
          Price: tx.sale_price + " ETH",
          Quantity: 1,
          From: getAddr(tx.seller_account),
          To: getAddr(tx.buyter_account),
          Time: tx.transactedAt,
        };
      });
      setTransactionList(transactionData);
    });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Type",
        accessor: "Type",
      },
      {
        Header: "Item",
        accessor: "Item",
      },
      {
        Header: "Price",
        accessor: "Price",
      },
      {
        Header: "Quantity",
        accessor: "Quantity",
      },
      {
        Header: "From",
        accessor: "From",
      },
      {
        Header: "To",
        accessor: "To",
      },
      {
        Header: "Time",
        accessor: "Time",
      },
    ],
    []
  );

  const getTimeDifference = function (timeStamp) {
    return `${((Date.now() - timeStamp) / 86400000000).toFixed(0)} 일 전`;
  };

  const getLink = function (tx) {
    return `https://ropsten.etherscan.io/tx/${tx}`;
  };

  const getAddr = function (address) {
    if (address === undefined) {
      address = "-----";
    }
    return address === walletAddr ? "You" : address.slice(0, 5);
  };

  const checkType = function (type) {
    if (type === 2) {
      return "Sold";
    } else if (type === 3) {
      return "On Sale";
    } else if (type === 4) {
      return "Minted";
    } else {
      return "AirDrop";
    }
  };

  const data = React.useMemo(
    () => transactionList,
    [
      {
        Type: "-----",
        Item: "-----",
        Price: "-----",
        Quantity: "-----",
        From: "-----",
        To: "-----",
        Time: "-----",
      },
    ]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
}

export default Table;
