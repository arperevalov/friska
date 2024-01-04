import Units from "@/enums/Units";
import useCards from "@/hooks/useCards";
import useLists from "@/hooks/useLists";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { Select } from "../Select";
import { InputCalendar } from "../InputCalendar";
import { SelectUnits } from "../SelectUnits";

interface FormValues {
    title: string;
    exp_date: string;
    left_count: string;
    units: string;
    list_id: string;
}

interface FormUpdateCardProps {
    onSubmit?: CallableFunction;
    parameters: number | null;
}

export default function FormUpdateCard(props: FormUpdateCardProps) {
    const { onSubmit, parameters } = props;
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const { cards, updateCardAction } = useCards();
    const { lists } = useLists();
    const units = Object.keys(Units);

    if (!parameters) return;

    const index = cards.findIndex((item) => item.id === parameters);
    const card = cards[index];

    const submitForm: SubmitHandler<FormValues> = (data) => {
        const formattedData = {
            ...data,
            id: card.id,
            exp_date: new Date(data.exp_date).toISOString().replace(/(\d)T(\d.{0,})\.\d{0,}Z/, "$1 $2"),
            list_id: parseInt(data.list_id, 10),
            left_count: parseInt(data.left_count, 10),
            user_id: 1,
        };
        updateCardAction(formattedData);
        reset();
        if (onSubmit) onSubmit();
    };

    return (
        <>
            <form className="form" action="#" onSubmit={handleSubmit(submitForm)}>
                <Input
                    type="text"
                    label="Title"
                    defaultValue={card.title}
                    formKey="title"
                    required={true}
                    register={register}
                />
                <Select
                    label="List"
                    values={lists}
                    defaultValue={card.list_id}
                    formKey="list_id"
                    required={true}
                    register={register}
                />
                <InputCalendar
                    label="Best Before"
                    defaultValue={new Date(card.exp_date)}
                    formKey="exp_date"
                    required={true}
                    register={register}
                />
                <div className="input-row">
                    <div className="input-row__col">
                        <Input
                            type="number"
                            label="Left"
                            defaultValue={card.left_count}
                            formKey="left_count"
                            required={true}
                            register={register}
                            min={0}
                            step={0.1}
                        />
                    </div>
                    <div className="input-row__col">
                        <SelectUnits label="Units" values={units} formKey="units" required={true} register={register} />
                    </div>
                </div>

                <button className="form__btn btn btn--primary" type="submit">
                    Save
                </button>
            </form>
        </>
    );
}
