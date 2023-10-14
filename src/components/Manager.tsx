import { useRef, useState, useCallback, ReactNode, useMemo } from "react";

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
    Input,
    Divider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Code,
    Pagination,
    getKeyValue,
} from "@nextui-org/react";

import { isBefore, endOfMonth, addMonths } from "date-fns";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    waiting: "warning",
    paused: "danger",
};

const subscriptionColorMap: Record<string, ChipProps["color"]> = {
    cardio: "success",
    weights: "primary",
    yoga: "secondary",
    boxing: "danger",
    karate: "warning",
    swimming: "default",
};

type tableContentT = {
    key: number;
    name: string;
    PhoneNumber?: number;
    subscription: (
        | "cardio"
        | "weights"
        | "yoga"
        | "boxing"
        | "karate"
        | "swimming"
    )[];
    date: Date | string | number;
    state: "active" | "waiting" | "paused";
};

function Manager() {
    // const phoneReg = /^(01)[0-2,5]{1}[0-9]{8}/g;

    const [newUser, setNewUser] = useState<tableContentT>({
        key: 0,
        name: "",
        PhoneNumber: 0,
        subscription: [],
        date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
        state: "active",
    });
    const [userData, setUserData] = useState<tableContentT[]>([
        {
            key: -1,
            name: "king youssef",
            PhoneNumber: 20105681167,
            subscription: ["weights", "yoga"],
            date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            state: "active",
        },
        {
            key: -2,
            name: "keven lovren",
            PhoneNumber: 0,
            subscription: ["weights", "cardio"],
            date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            state: "waiting",
        },
        {
            key: -3,
            name: "big jon",
            PhoneNumber: 0,
            subscription: ["cardio"],
            date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
            state: "paused",
        },
    ]);

    const [subscriptions, setSubscriptions] = useState<
        {
            value:
                | "cardio"
                | "weights"
                | "yoga"
                | "boxing"
                | "karate"
                | "swimming";
            color: ChipProps["color"];
            selected: boolean;
        }[]
    >([
        {
            value: "weights",
            color: "primary",
            selected: false,
        },
        {
            value: "cardio",
            color: "success",
            selected: false,
        },
        {
            value: "yoga",
            color: "secondary",
            selected: false,
        },
        {
            value: "boxing",
            color: "danger",
            selected: false,
        },
        {
            value: "karate",
            color: "warning",
            selected: false,
        },
        {
            value: "swimming",
            color: "default",
            selected: false,
        },
    ]);

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
        {
            key: "manage",
            label: "",
        },
    ];

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const pages = Math.ceil(userData.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return userData.slice(start, end);
    }, [page, userData]);

    // const set = new Set<number | string>();
    // for (let i = 0; i < userData.length; i++) {
    //     if (userData[i].state == "paused") {
    //         set.add(userData[i].key.toString());
    //     }
    // }
    // const selectedKeys = useRef(set);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isValidUser, setIsValidUser] = useState<boolean>();

    const cellData = useCallback(
        (userData: tableContentT, columnKey: React.Key) => {
            const cellValue = userData[columnKey as keyof tableContentT];

            // const currentDate = new Date();

            // if (isBefore(parseISO(userData.date), currentDate)) {
            //     console.log("before");
            // }

            switch (columnKey) {
                case "name":
                    return (
                        // ? add a popover for the user info
                        // ? in the popover make the name/number cody with Snippet + more user data

                        <User
                            className="capitalize"
                            avatarProps={{
                                radius: "full",
                                showFallback: true,
                                isBordered: true,
                                color: statusColorMap[userData.state],
                                src: "",
                            }}
                            description={
                                userData.PhoneNumber == 0
                                    ? "No Number provided"
                                    : userData.PhoneNumber
                            }
                            name={cellValue as string}
                        />
                    );
                case "subscription":
                    return (
                        <div className="flex gap-2 overflow-x-hidden ">
                            {(cellValue as [])?.map((sub, i) => {
                                return (
                                    <Chip
                                        className="capitalize"
                                        color={subscriptionColorMap[sub]}
                                        size="md"
                                        variant="flat"
                                        key={i}
                                    >
                                        {sub}
                                    </Chip>
                                );
                            })}
                        </div>
                    );
                case "date":
                    return <Code>{cellValue as string}</Code>;
                case "state":
                    // ! make the state work with the date
                    return (
                        <Tooltip
                            content={
                                cellValue == "active"
                                    ? "active subscription"
                                    : cellValue == "waiting"
                                    ? "expired, Warning week!"
                                    : cellValue == "paused"
                                    ? "subscription expired"
                                    : "how do we got here"
                            }
                            placement="right"
                            color={statusColorMap[cellValue as string]}
                        >
                            <Chip
                                className="capitalize"
                                color={statusColorMap[cellValue as string]}
                                size="md"
                                variant="dot"
                            >
                                {cellValue as string}
                            </Chip>
                        </Tooltip>
                    );
                case "manage":
                    return (
                        <div className="flex gap-2 justify-end">
                            <Button
                                // aria-label="Add new client data"
                                color="default"
                                isIconOnly
                                variant="light"
                                size="sm"
                                // onPress={onOpen}
                            >
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                            </Button>
                            <Button
                                // aria-label="Add new client data"
                                color="default"
                                isIconOnly
                                variant="light"
                                size="sm"
                                // onPress={onOpen}
                            >
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                            </Button>
                        </div>
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
                // selectionMode="single"
                // disabledKeys={selectedKeys.current}
                // onSelectionChange={() => {
                //     // ! add the edit
                // }}
                layout="fixed"
                radius="sm"
                bottomContent={
                    <div className="flex w-full justify-between">
                        <Tooltip content="Add new client data" placement="top">
                            <Button
                                color="default"
                                isIconOnly
                                variant="flat"
                                aria-label="Add new client data"
                                onPress={onOpen}
                            >
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                            </Button>
                        </Tooltip>
                        <Pagination
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
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
                    items={items}
                    emptyContent={
                        "No data to display, click '+' icon to add a new row"
                    }
                >
                    {/* 
                    // ! add an edit item button 
                    // 
                    */}
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Create New Client
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    type="text"
                                    label="Name"
                                    placeholder="Client Name"
                                    description="Enter Client Name"
                                    labelPlacement="outside"
                                    isRequired
                                    isClearable
                                    color={
                                        isValidUser === false
                                            ? "danger"
                                            : "default"
                                    }
                                    // startContent={}
                                    // endContent={}
                                    onValueChange={(value) => {
                                        setNewUser((prev) => {
                                            return { ...prev, name: value };
                                        });
                                    }}
                                />
                                <Input
                                    type="tel"
                                    label="Phone Number"
                                    placeholder="Client phone number"
                                    description="Enter Client phone number"
                                    labelPlacement="outside"
                                    isClearable
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">
                                                +20
                                            </span>
                                        </div>
                                    }
                                    onValueChange={(value) => {
                                        setNewUser((prev) => {
                                            return {
                                                ...prev,
                                                PhoneNumber: parseInt(value),
                                            };
                                        });
                                    }}
                                />
                                <Divider className="my-4" />
                                <h4 className="text-medium font-medium">
                                    Chose Subscription[s] Plan:
                                </h4>
                                <div
                                    className={`flex gap-2 ${
                                        isValidUser === false
                                            ? "bg-danger-50"
                                            : ""
                                    } p-4 rounded-md`}
                                >
                                    {/* 
                                    // ! add an error state 
                                    */}
                                    {subscriptions.map((subscription, i) => {
                                        return (
                                            <Chip
                                                className="capitalize"
                                                style={{ cursor: "pointer" }}
                                                key={subscription.value}
                                                color={subscription.color}
                                                size="md"
                                                variant={
                                                    subscriptions[i].selected
                                                        ? "solid"
                                                        : "bordered"
                                                }
                                                onClick={() => {
                                                    setSubscriptions(
                                                        (prevSubscriptions) => {
                                                            const newSubscriptions =
                                                                [
                                                                    ...prevSubscriptions,
                                                                ];
                                                            newSubscriptions[
                                                                i
                                                            ] = {
                                                                ...newSubscriptions[
                                                                    i
                                                                ],
                                                                selected:
                                                                    !newSubscriptions[
                                                                        i
                                                                    ].selected,
                                                            };
                                                            return newSubscriptions;
                                                        }
                                                    );
                                                }}
                                            >
                                                {subscription.value}
                                            </Chip>
                                        );
                                    })}
                                </div>
                                {/* 
                                // ? add the date input
                                 */}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    type="submit"
                                    onPress={() => {
                                        subscriptions.map((sub) => {
                                            if (sub.selected) {
                                                newUser.subscription.push(
                                                    sub.value
                                                );
                                            }
                                            sub.selected = false;
                                        });
                                        if (
                                            newUser.name == "" ||
                                            newUser.subscription.length == 0
                                        ) {
                                            setIsValidUser(false);
                                        } else {
                                            setIsValidUser(true);
                                            setUserData((prevUserData) => {
                                                return [
                                                    ...prevUserData,
                                                    newUser,
                                                ];
                                            });
                                            setNewUser((prev) => {
                                                const k = prev.key++;
                                                return {
                                                    ...prev,
                                                    key: k,
                                                    subscription: [],
                                                };
                                            });
                                            onClose();
                                        }
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
