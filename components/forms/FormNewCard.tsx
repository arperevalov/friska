import Units from "@/enums/Units";
import useCards from "@/hooks/useCards";
import useLists from "@/hooks/useLists";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { Select } from "../Select";
import { InputCalendar } from "../InputCalendar";
import { SelectUnits } from "../SelectUnits";
import ModalsEnum from "@/enums/Modals";
import useModals from "@/hooks/useModals";
import Image from "next/image";

interface FormValues {
    title: string;
    exp_date: string;
    left_count: string;
    units: string;
    list_id: string;
}

interface FormNewCardProps {
    onSubmit?: CallableFunction;
}

export default function FormNewCard(props: FormNewCardProps) {
    const { onSubmit } = props;
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const { addCardAction } = useCards();
    const { toggleModalAction } = useModals();
    const { lists } = useLists();
    const units = Object.keys(Units);

    const submitForm: SubmitHandler<FormValues> = (data) => {
        const formattedData = {
            ...data,
            exp_date: new Date(data.exp_date).toISOString().replace(/(\d)T(\d.{0,})\.\d{0,}Z/, "$1 $2"),
            list_id: parseInt(data.list_id, 10),
            left_count: parseFloat(data.left_count),
            user_id: 1,
        };
        addCardAction(formattedData);
        reset();
        if (onSubmit) onSubmit();
    };

    const onCreateListClick = () => {
        toggleModalAction(ModalsEnum.FormNewList, null);
        reset();
        if (onSubmit) onSubmit();
    };

    if (!lists) return <></>;
    if (lists.length === 0)
        return (
            <>
                <div className="empty empty--modal">
                    <picture className="empty__picture">
                        <Image
                            alt="You don't have any list yet"
                            src="/svg/empty-list.svg"
                            fill
                            style={{ color: "inherit" }}
                        />
                    </picture>
                    <h3 className="empty__text">
                        Oh, no! You don’t have any list yet. <br />
                        Start with creating one!
                    </h3>
                    <button type="button" onClick={onCreateListClick} className="link link--primary link--centered">
                        Create new list
                    </button>
                </div>
            </>
        );

    return (
        <>
            <form className="form" action="#" onSubmit={handleSubmit(submitForm)}>
                <Input formKey="title" label="Title" register={register} type="text" required />
                <Select
                    formKey="list_id"
                    label="List"
                    values={lists}
                    defaultValue={lists[0].id}
                    register={register}
                    required
                />
                <InputCalendar formKey="exp_date" label="Best Before" register={register} required />

                <div className="input-row">
                    <div className="input-row__col">
                        <Input
                            formKey="left_count"
                            label="Left"
                            min={0}
                            step={0.01}
                            register={register}
                            type="number"
                            required
                        />
                    </div>
                    <div className="input-row__col">
                        <SelectUnits
                            formKey="units"
                            label="Units"
                            values={units}
                            register={register}
                            required
                        />
                    </div>
                </div>
                <button className="form__btn btn btn--primary" type="submit">
                    Add new
                </button>
            </form>
        </>
    );
}
