import { useRef, useState } from "react";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Link,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
} from "@nextui-org/react";

function Header({
    themeConfig,
    switchTheme,
}: {
    themeConfig: boolean;
    switchTheme: () => void;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const menuItems = useRef(["Profile", "Dashboard", "Activity"]);

    return (
        <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                <Link color="foreground" href="/">
                    <span className="material-symbols-outlined">exercise</span>
                    <p className="font-bold text-inherit">GM-2000</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        isIconOnly
                        color="primary"
                        variant="flat"
                        aria-label="switch theme"
                        onClick={() => switchTheme()}
                    >
                        {themeConfig ? (
                            <span className="material-symbols-outlined">
                                light_mode
                            </span>
                        ) : (
                            <span className="material-symbols-outlined">
                                mode_night
                            </span>
                        )}
                    </Button>
                </NavbarItem>
                <Dropdown>
                    <NavbarItem className="hidden lg:flex">
                        <DropdownTrigger>
                            <Button
                                color="primary"
                                variant="shadow"
                                endContent={
                                    <span className="material-symbols-outlined">
                                        expand_more
                                    </span>
                                }
                            >
                                Open Menu
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownSection title="Actions" showDivider>
                            <DropdownItem key="new">New file</DropdownItem>
                            <DropdownItem key="copy">Copy link</DropdownItem>
                            <DropdownItem key="edit">Edit file</DropdownItem>
                        </DropdownSection>
                        <DropdownSection title="Danger zone">
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                            >
                                Delete file
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.current.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2
                                    ? "primary"
                                    : index === menuItems.current.length - 1
                                    ? "danger"
                                    : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default Header;