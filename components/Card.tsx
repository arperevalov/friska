export interface CardInterface {
    title: string,
    category: string,
    expDate: string,
    left: number,
    measurement: string
}

export const Card = (props: {
    card: CardInterface
}) => {

    const { title, category, expDate, left, measurement} = props.card;

    return <>
        <div className="card">
          <div className="card__top h4">
            <div className="card__line">
                { expDate }
                <div>exp</div>
            </div>
            <div className="card__line">
                { left + measurement }
                <div>left</div>
            </div>
          </div>
          <div className="card__bottom">
            <h3 className='h2'>
                { title }
            </h3>
            <h4 className='h4'>
                { category }
            </h4>
          </div>
        </div>
    </>
}