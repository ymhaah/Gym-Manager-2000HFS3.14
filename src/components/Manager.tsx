import { useRef, useState, useCallback, ReactNode } from "react";

import useLocalStorage from "../hooks/useLocalStorage.tsx";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    ChipProps,
    Select,
    SelectItem,
    SelectedItems,
    Tooltip,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    waiting: "warning",
    paused: "danger",
};
const subscriptionColorMap: Record<string, ChipProps["color"]> = {
    cardio: "success",
    weights: "primary",
    yoga: "secondary",
};

type tableContentT = {
    key: number;
    name: string;
    subscription: "cardio" | "weights" | "yoga";
    date: Date | number;
    state: "active" | "waiting" | "paused";
};

function Manager() {
    const userData: tableContentT[] = [
        {
            key: 1,
            name: "youssef 23",
            subscription: "cardio",
            date: new Date().getFullYear(),
            state: "active",
        },
        {
            key: 2,
            name: "keven loveron",
            subscription: "weights",
            date: new Date().getFullYear(),
            state: "paused",
        },
        {
            key: 3,
            name: "ronny coleman",
            subscription: "weights",
            date: new Date().getFullYear(),
            state: "paused",
        },
        {
            key: 4,
            name: "karen smith",
            subscription: "yoga",
            date: new Date().getFullYear(),
            state: "waiting",
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

    const set = new Set<number | string>();
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].state == "paused") {
            set.add(userData[i].key.toString());
        }
    }
    const selectedKeys = useRef(set);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const cellData = useCallback(
        (userData: tableContentT, columnKey: React.Key) => {
            const cellValue = userData[columnKey as keyof tableContentT];

            const subscriptions = [
                {
                    label: "cardio",
                    value: "cardio",
                    description: "The second most popular pet in the world",
                },
                {
                    label: "weights",
                    value: "weights",
                    description: "The second most popular pet in the world",
                },
                {
                    label: "yoga",
                    value: "yoga",
                    description: "The second most popular pet in the world",
                },
            ];

            switch (columnKey) {
                case "name":
                    return (
                        <User
                            className="capitalize"
                            avatarProps={{
                                radius: "full",
                                showFallback: true,
                                isBordered: true,
                                color: "primary",
                                src: "",
                            }}
                            description="test the description"
                            name={cellValue as string}
                        />
                    );
                case "subscription":
                    return (
                        <Chip
                            className="capitalize"
                            color={subscriptionColorMap[cellValue as string]}
                            size="md"
                            variant="flat"
                        >
                            {cellValue as string}
                        </Chip>
                        // <Select
                        //     items={userData as never}
                        //     aria-label="subscription plan"
                        //     labelPlacement="outside-left"
                        //     size="md"
                        //     variant="bordered"
                        //     selectionMode="multiple"
                        //     isMultiline={true}
                        //     defaultSelectedKeys={[cellValue] as string[]}
                        //     renderValue={(
                        //         items: SelectedItems<tableContentT>
                        //     ) => {
                        //         return (
                        //             <div className="flex flex-wrap gap-1 ">
                        //                 {items.map((item) => (
                        //                     <Chip
                        //                         key={item.key}
                        //                         size="sm"
                        //                         radius="sm"
                        //                     >
                        //                         {item.textValue}
                        //                     </Chip>
                        //                 ))}
                        //             </div>
                        //         );
                        //     }}
                        // >
                        //     {subscriptions.map((subscription) => (
                        //         <SelectItem
                        //             key={subscription.value}
                        //             textValue={subscription.value}
                        //         >
                        //             {subscription.value}
                        //         </SelectItem>
                        //     ))}
                        // </Select>
                    );
                case "date":
                    return (
                        <div className="relative flex items-center gap-2">
                            <p>{cellValue as string}</p>
                        </div>
                    );
                case "state":
                    return (
                        <Chip
                            className="capitalize"
                            color={statusColorMap[cellValue as string]}
                            size="md"
                            variant="flat"
                        >
                            {cellValue as string}
                        </Chip>
                    );
                default:
                    return cellValue;
            }
        },
        []
    );

    return (
        <>
            <Table
                aria-label="gym table manager"
                selectionMode="single"
                disabledKeys={selectedKeys.current}
                onSelectionChange={() => {
                    // ! add the edit
                }}
                layout="fixed"
                radius="sm"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Tooltip
                            content="Add new client data"
                            placement="bottom"
                        >
                            <Button
                                color="primary"
                                variant="shadow"
                                aria-label="Add new client data"
                                onPress={onOpen}
                                endContent={
                                    <span className="material-symbols-outlined">
                                        add
                                    </span>
                                }
                            >
                                Add Client
                            </Button>
                        </Tooltip>
                    </div>
                }
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>
                            {column.label}
                        </TableColumn>
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
                                <TableCell>
                                    {cellData(item, columnKey) as ReactNode}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Modal Title
                            </ModalHeader>
                            <ModalBody>
                                {/* ! add the input and link it to the userData to update the table content */}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        // ! update table data from the input
                                        onClose();
                                    }}
                                    endContent={
                                        <span className="material-symbols-outlined">
                                            add
                                        </span>
                                    }
                                >
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default Manager;
