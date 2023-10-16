import { useRef, useState } from "react";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Tooltip,
    Divider,
} from "@nextui-org/react";

import { Link as UiLink } from "@nextui-org/react"; // ? next UI link
import { Link as RLink } from "react-router-dom"; // ? react router link

function Header({
    themeConfig,
    switchTheme,
}: {
    themeConfig: boolean;
    switchTheme: () => void;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const menuItems = useRef(["Home", "Statistics", "About"]);

    return (
        <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                <RLink to="/" className="flex">
                    <span className="material-symbols-outlined">exercise</span>
                    <p className="font-bold text-inherit">GM-2000</p>
                </RLink>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Tooltip content="switch theme" placement="bottom">
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
                    </Tooltip>
                </NavbarItem>
                {/* //! link the Dropdown to the table */}
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
                {/* // ! fix the link path */}
                {menuItems.current.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <UiLink href={`/${item}`}>{item}</UiLink>
                        <Divider className="my-2" />
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default Header;
