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
import { useState, type ReactNode } from "react";
import Settings from "@/pages/settings";
import FolderPicker from "@/pages/folder-picker";
import DirectoryPicker from "@/pages/directory-picker";

type ModalType = "settings" | "directory" | "folder";

const ModalBoilerplate = ({
    isOpen,
    onOpenChange,
    children,
    title
}: {
    isOpen: boolean;
    onOpenChange: (() => void);
    title: string;
    children: ReactNode | ((close: () => void) => ReactNode);
}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            {typeof children === "function" ? children(close) : children}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="faded" onPress={close}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export function Menu() {
    const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);

    const openModal = (type: ModalType) => {
        setActiveModal(type);
        onOpen();
    };

    const modalMap: Record<
        ModalType,
        { title: string; render: (close: () => void) => ReactNode }
    > = {
        directory: {
            title: "Directory(s)",
            render: (close) => <DirectoryPicker onClose={close} />
        },
        folder: {
            title: "Folder(s)",
            render: (close) => <FolderPicker onClose={close} />
        },
        settings: {
            title: "Settings",
            render: (close) => <Settings onClose={close} />
        }
    };

    const modalData = activeModal ? modalMap[activeModal] : null;

    return (
        <section className="flex flex-row items-center gap-x-2">

            <Dropdown>
                <DropdownTrigger>
                    <Button variant="solid">File</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">

                    <DropdownItem
                        key="directory"
                        shortcut="⌘N"
                        startContent={<FileIcon className={iconClasses} />}
                        onPress={() => openModal("directory")}
                    >
                        Open directory(s)
                    </DropdownItem>

                    <DropdownItem
                        key="folder"
                        shortcut="⌘C"
                        startContent={<FileIcon className={iconClasses} />}
                        onPress={() => openModal("folder")}
                    >
                        Open folder(s)
                    </DropdownItem>

                </DropdownMenu>
            </Dropdown>

            <Button onPress={() => openModal("settings")}>
                Settings
            </Button>

            {modalData && (
                <ModalBoilerplate
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    title={modalData.title}
                >
                    {(close) => modalData.render(close)}
                </ModalBoilerplate>
            )}
        </section>
    );
}
