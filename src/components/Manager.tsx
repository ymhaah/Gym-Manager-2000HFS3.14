import { useRef, useState, useCallback } from "react";

import useLocalStorage from "../hooks/useLocalStorage.tsx";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
} from "@nextui-org/react";

type tableContentT = {
    key: number;
    name: string;
    subscription: string;
    date: Date | number;
    state: string;
};

function Manager() {
    const userData: tableContentT[] = [
        {
            key: 1,
            name: "youssef 23",
            subscription: "CEO",
            date: new Date().getFullYear(),
            state: "Active",
        },
    ];

    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "subscription",
            label: "SUBSCRIPTION",
        },
        {
            key: "date",
            label: "DATE",
        },
        {
            key: "state",
            label: "STATE",
        },
    ];

    const cellData = useCallback(
        (userData: tableContentT, columnKey: React.Key) => {
            const cellValue = userData[columnKey as keyof tableContentT];

            switch (columnKey) {
                case "name":
                    return (
                        <User
                            avatarProps={{
                                radius: "full",
                                showFallback: true,
                                isBordered: true,
                                color: "primary",
                                src: "",
                            }}
                            description="test the description"
                            name={cellValue as string | number}
                        />
                    );
                case "subscription":
                    return (
                        <div className="relative flex items-center gap-2"></div>
                    );
                case "date":
                    return (
                        <div className="relative flex items-center gap-2"></div>
                    );
                case "state":
                    return (
                        <div className="relative flex items-center gap-2"></div>
                    );
                default:
                    return cellValue;
            }
        },
        []
    );

    return (
        <Table aria-label="gym table manager">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={userData}
                emptyContent={
                    "No data to display, click '+' icon to add a new row"
                }
            >
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => (
                            <TableCell>{cellData(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default Manager;
