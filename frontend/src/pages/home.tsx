import { Fragment } from "react";
import { Menu } from "@/components/menu";
import { InputPreview } from "@/components/input-preview";
import { OutputPreview } from "@/components/output-preview";

export default function Homepage() {

    return (
        <Fragment>
            <Menu />

            <section className="flex flex-1 flex-row gap-x-4 my-4">
                <div className="flex-1">
                    <InputPreview />
                </div>

                <div className="flex-1">
                    <OutputPreview />
                </div>
            </section>
        </Fragment>
    )
}
