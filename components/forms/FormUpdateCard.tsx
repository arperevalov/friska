import Units from "@/enums/Units";
import useCards from "@/hooks/useCards";
import useLists from "@/hooks/useLists";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../shared/input/Input";
import { Select } from "../shared/select/Select";
import { InputCalendar } from "../shared/input-calendar/InputCalendar";
import { SelectUnits } from "../shared/select-units/SelectUnits";

interface FormValues {
    title: string;
    exp_date: string;
    left_count: string;
    units: string;
    list_id: string;
    best_before: string;
}

interface FormUpdateCardProps {
    onSubmit?: CallableFunction;
    parameters: string | number | null;
}

export default function FormUpdateCard(props: FormUpdateCardProps) {
    const { onSubmit, parameters } = props;
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const { cards, updateCardAction } = useCards();
    const { lists } = useLists();
    const units = Object.keys(Units);
    let cardId = parameters;

    if (cardId === null || cardId === undefined) return;
    if (typeof cardId === "string") cardId = parseInt(cardId, 10);

    const index = cards.findIndex((item) => item.id === cardId);
    const card = cards[index];

    const submitForm: SubmitHandler<FormValues> = (data) => {
        const formattedData = {
            ...data,
            id: card.id,
            exp_date: new Date(data.exp_date).toISOString().replace(/(\d)T(\d.{0,})\.\d{0,}Z/, "$1 $2"),
            list_id: parseInt(data.list_id, 10),
            left_count: parseFloat(data.left_count),
            user_id: 1,
            best_before: parseInt(data.best_before, 10),
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
                    label="Expiry date"
                    defaultValue={new Date(card.exp_date)}
                    formKey="exp_date"
                    required={true}
                    register={register}
                />
                <div className="input-row">
                    <div className="input-row__col">
                        <Input
                            type="number"
                            label="Best before limit, days"
                            defaultValue={card.best_before}
                            formKey="best_before"
                            required={true}
                            register={register}
                            min={0}
                            step={1}
                        />
                    </div>
                    <div className="input-row__col">
                        <p className="input-row__text">
                            Set number of days when we should notify you about outdated products in your list
                        </p>
                    </div>
                </div>
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
                            step={0.01}
                        />
                    </div>
                    <div className="input-row__col">
                        <SelectUnits
                            label="Units"
                            values={units}
                            formKey="units"
                            required={true}
                            register={register}
                            defaultValue={card.units}
                        />
                    </div>
                </div>

                <button className="form__btn btn btn--primary" type="submit">
                    Save
                </button>
            </form>
        </>
    );
}
