import { useState, useCallback, ReactNode, useMemo } from "react";

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
    Code,
    Pagination,
} from "@nextui-org/react";

import { toast } from "sonner";

// import {
//     isBefore,
//     isAfter,
//     endOfMonth,
//     addMonths,
//     startOfMonth,
// } from "date-fns";

// TODO: filter & search
// TODO: the edit button
// TODO: link the subscription state to the data with "date-fns"
// TODO: make the table work on phone size
// TODO: add the data biker
// TODO: add a popover for the user info
// TODO: in the popover make the name/number cody with Snippet + more user data
// TODO: use Regex to validate the input date name/phone

type subscriptionsT =
    | "cardio"
    | "weights"
    | "yoga"
    | "boxing"
    | "karate"
    | "swimming";

type subscriptionsInfoT = {
    value: subscriptionsT;
    color: ChipProps["color"];
    selected: boolean;
}[];

type tableContentT = {
    key: number;
    name: string;
    PhoneNumber?: string | number;
    subscription: subscriptionsT[];
    date: Date | string | number;
    state: "active" | "waiting" | "paused";
};

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

function Manager() {
    // ! const phoneReg = /^(01)[0-2,5]{1}[0-9]{8}/g;

    const [usersData, setUsersData] = useState<tableContentT[]>([
        {
            key: 0,
            name: "king youssef",
            PhoneNumber: 20105681167,
            subscription: ["weights", "yoga"],
            date: new Date().toISOString().slice(0, 10),
            state: "active",
        },
        {
            key: 1,
            name: "keven lovren",
            subscription: ["weights", "cardio"],
            date: `2023-10-1`,
            state: "waiting",
        },
        {
            key: 2,
            name: "big jon",
            subscription: ["cardio"],
            date: `2023-9-1`,
            state: "paused",
        },
    ]);

    const [newUser, setNewUser] = useState<tableContentT>({
        key: usersData.length,
        name: "",
        PhoneNumber: "",
        subscription: [],
        date: new Date().toISOString().slice(0, 10),
        state: "active",
    });

    const [subscriptions, setSubscriptions] = useState<subscriptionsInfoT>([
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
    const rowsPerPage = 10;
    const pages = Math.ceil(usersData.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return usersData.slice(start, end);
    }, [page, usersData]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isValidUserName, setIsValidUserName] = useState<boolean>(true);
    const [isValidUserSub, setIsValidUserSub] = useState<boolean>(true);

    const [editOrNew, setEditOrNew] = useState<number>();

    const cellData = useCallback(
        (userData: tableContentT, columnKey: React.Key, i: number) => {
            const cellValue = userData[columnKey as keyof tableContentT];
            switch (columnKey) {
                case "name":
                    return (
                        <User
                            className="capitalize whitespace-nowrap"
                            avatarProps={{
                                radius: "full",
                                showFallback: true,
                                isBordered: true,
                                color: statusColorMap[userData.state],
                                src: "",
                            }}
                            description={
                                userData.PhoneNumber == 0
                                    ? "No-Number"
                                    : userData.PhoneNumber
                            }
                            name={cellValue as string}
                        />
                    );
                case "subscription":
                    return (
                        <div className="flex gap-2 flex-wrap">
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
                            <Tooltip
                                content="Delete User"
                                placement="top"
                                color="danger"
                            >
                                <Button
                                    aria-label="delete this user info"
                                    color="danger"
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onPress={() => {
                                        setUsersData((prevUsersData) => {
                                            const newUserData = [
                                                ...prevUsersData,
                                            ];
                                            newUserData.splice(i, 1);
                                            return newUserData;
                                        });
                                    }}
                                >
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                content="Edit User"
                                placement="top"
                                color="default"
                            >
                                <Button
                                    aria-label="edit this user info"
                                    color="default"
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onPress={() => {
                                        toast.error("Incomplete Feature");
                                    }}
                                >
                                    <span className="material-symbols-outlined">
                                        edit
                                    </span>
                                </Button>
                            </Tooltip>
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
                className="p-4"
                aria-label="gym table manager"
                isStriped={true}
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
                                onPress={() => {
                                    onOpen();
                                    setEditOrNew(usersData.length);
                                }}
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
                    {items.map((item, i) => {
                        return (
                            <TableRow key={item.key}>
                                {(columnKey) => (
                                    <TableCell>
                                        {
                                            cellData(
                                                item,
                                                columnKey,
                                                i
                                            ) as ReactNode
                                        }
                                    </TableCell>
                                )}
                            </TableRow>
                        );
                    })}
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
                                    description={
                                        isValidUserName
                                            ? "Enter Client Name"
                                            : newUser.name.length >= 15
                                            ? "Please Enter a Name less than 15 Chr"
                                            : "Please Enter a Name"
                                    }
                                    labelPlacement="outside"
                                    isRequired
                                    isClearable
                                    color={
                                        isValidUserName === true
                                            ? "default"
                                            : "danger"
                                    }
                                    value={
                                        (editOrNew as number) >
                                        usersData.length - 1
                                            ? newUser.name
                                            : usersData[editOrNew as number]
                                                  .name
                                    }
                                    onValueChange={(value) => {
                                        (editOrNew as number) >
                                        usersData.length - 1
                                            ? setNewUser((prev) => {
                                                  return {
                                                      ...prev,
                                                      name: value,
                                                  };
                                              })
                                            : setUsersData((prev) => {
                                                  const newUserData = [...prev];

                                                  newUserData[
                                                      editOrNew as number
                                                  ].name = value;

                                                  return newUserData;
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
                                    value={
                                        (editOrNew as number) >
                                        usersData.length - 1
                                            ? (newUser.PhoneNumber as string)
                                            : (usersData[editOrNew as number]
                                                  .PhoneNumber as string)
                                    }
                                    onValueChange={(value) => {
                                        (editOrNew as number) >
                                        usersData.length - 1
                                            ? setNewUser((prev) => {
                                                  return {
                                                      ...prev,
                                                      PhoneNumber: value,
                                                  };
                                              })
                                            : setUsersData((prev) => {
                                                  const newUserData = [...prev];

                                                  newUserData[
                                                      editOrNew as number
                                                  ].PhoneNumber = value;

                                                  return newUserData;
                                              });
                                    }}
                                />
                                <Divider className="my-4" />
                                <h4 className="text-medium font-medium">
                                    Chose Subscription[s] Plan:
                                </h4>
                                <div
                                    className={`flex gap-2 ${
                                        isValidUserSub === false
                                            ? "bg-danger-50"
                                            : ""
                                    } p-4 rounded-md`}
                                >
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
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    type="submit"
                                    onPress={() => {
                                        subscriptions.map((sub) => {
                                            if (sub.selected) {
                                                if (
                                                    newUser.subscription.every(
                                                        (ns) => {
                                                            return (
                                                                sub.value != ns
                                                            );
                                                        }
                                                    )
                                                ) {
                                                    newUser.subscription.push(
                                                        sub.value
                                                    );
                                                }
                                            }
                                        });

                                        if (
                                            newUser.name == "" &&
                                            newUser.subscription.length == 0
                                        ) {
                                            setIsValidUserName(false);
                                            setIsValidUserSub(false);
                                        } else if (
                                            newUser.name == "" ||
                                            newUser.name.length >= 15
                                        ) {
                                            setIsValidUserName(false);
                                        } else if (
                                            newUser.subscription.length == 0
                                        ) {
                                            setIsValidUserSub(false);
                                        } else {
                                            setIsValidUserName(true);
                                            setIsValidUserSub(true);
                                            setUsersData((prevUsersData) => {
                                                return [
                                                    ...prevUsersData,
                                                    newUser,
                                                ];
                                            });

                                            setNewUser((prev) => {
                                                const k = prev.key++;
                                                return {
                                                    ...prev,
                                                    name: "",
                                                    PhoneNumber: 0,
                                                    key: k,
                                                    subscription: [],
                                                };
                                            });
                                            subscriptions.map((sub) => {
                                                if (sub.selected) {
                                                    if (
                                                        newUser.subscription.every(
                                                            (ns) => {
                                                                return (
                                                                    sub.value !=
                                                                    ns
                                                                );
                                                            }
                                                        )
                                                    ) {
                                                        newUser.subscription.push(
                                                            sub.value
                                                        );
                                                    }
                                                }
                                                sub.selected = false;
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
