const ItemCard = ({item}) => {
    return (
        <div className="item">
            <div>
                <p>{item.name}</p>
            </div>

            <div>
                <h3>{item.quantity}</h3>
                <h3>{item.price}</h3>
            </div>
        </div>
    );
}

export default ItemCard;