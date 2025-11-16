import { Fragment } from "react";
import { Menu } from "@/components/menu";
import { InputPreview } from "@/components/input-preview";
import { OutputPreview } from "@/components/output-preview";

export default function Homepage() {
    return (
        <Fragment>
            <Menu />

            <section className="flex w-full flex-row gap-x-4 my-4 h-full">
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
