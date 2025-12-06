import { Button } from "@heroui/react";
import { Fragment, useState } from "react";

export default function FolderPicker({ onClose }: { onClose: () => void; }) {
    const [data, setData] = useState<any | null>(null);

    const test = async () => {
        const n = await (window as any).go.api.App.GetFolder("/home/jelius-sama/Blogs")
        setData(n)
    }

    return (
        <Fragment>
            <Button onPress={test} >Open file ("/home/jelius-sama/Blogs")</Button>
            <pre>{JSON.stringify(data, null, 4)}</pre>
            <p>Folder Picker modal</p>
        </Fragment>
    )
}
