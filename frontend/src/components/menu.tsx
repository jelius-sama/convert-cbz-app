import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from "@heroui/react";
import { FileIcon } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import Settings from "@/pages/settings";
import FolderPicker from "@/pages/folder-picker";
import DirectoryPicker from "@/pages/directory-picker";

const ModalBoilerplate = ({
    isOpen,
    onOpenChange,
    children,
    title
}: {
    isOpen: boolean,
    onOpenChange: (() => void),
    title: string,
    children: ReactNode | ((close: () => void) => ReactNode);
}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onSettingsClose) => (
                    <Fragment>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            {typeof children === "function"
                                ? children(onSettingsClose)
                                : children}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="faded" onPress={onSettingsClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Fragment>
                )}
            </ModalContent>
        </Modal>
    )
}

export function Menu() {
    const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";
    const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onOpenChange: onSettingsOpenChange } = useDisclosure();
    const { isOpen: isDirectoryPickerOpen, onOpen: onDirectoryPickerOpen, onOpenChange: onDirectoryPickerOpenChange } = useDisclosure();
    const { isOpen: isFolderPickerOpen, onOpen: onFolderPickerOpen, onOpenChange: onFolderPickerOpenChange } = useDisclosure();

    return (
        <section className="flex flex-row items-center gap-x-2">
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="solid">File</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
                    <DropdownItem
                        key="new"
                        shortcut="⌘N"
                        onPress={onDirectoryPickerOpen}
                        startContent={<FileIcon className={iconClasses} />}
                    >
                        Open directory(s)
                    </DropdownItem>
                    <DropdownItem
                        key="copy"
                        shortcut="⌘C"
                        onPress={onFolderPickerOpen}
                        startContent={<FileIcon className={iconClasses} />}
                    >
                        Open folder(s)
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Button onPress={onSettingsOpen}>Settings</Button>

            {/* INFO: Openable Modals */}
            <ModalBoilerplate isOpen={isDirectoryPickerOpen} onOpenChange={onDirectoryPickerOpenChange} title="Directory(s)">
                {(close) => <DirectoryPicker onClose={close} />}
            </ModalBoilerplate>
            <ModalBoilerplate isOpen={isFolderPickerOpen} onOpenChange={onFolderPickerOpenChange} title="Folder(s)">
                {(close) => <FolderPicker onClose={close} />}
            </ModalBoilerplate>
            <ModalBoilerplate isOpen={isSettingsOpen} onOpenChange={onSettingsOpenChange} title="Settings">
                {(close) => <Settings onClose={close} />}
            </ModalBoilerplate>
        </section>
    );
}
