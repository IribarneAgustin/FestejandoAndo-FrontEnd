import { FaShoppingCart, FaStar } from 'react-icons/fa';
import "../../Assets/Styles/WebSite/TopicCards.css";
import { useNavigate } from 'react-router-dom';
export function TopicCards(props) {
    const navigate = useNavigate();

    function onClickImage(topicId) {
        navigate(`/tematica/${topicId}`);
    }

    return (
        <div className='productList'>
            <div key={props.id} className='productCard'>
                <img onClick={() => onClickImage(props.id)} src={props.image[0]} alt='product-img' className='productImage' />

                <div className='productCard__content'>
                    <h3 className='productName'>{props.name}</h3>
                    <div className='displayStack__1'>
                        <div className='productDescription'>{props.description}</div>
                    </div>
                    <div className='displayStack__2'>
                        <button className="productCard__button">Agregar al carrito <FaShoppingCart /></button>
                        <div className="productRating">
                            {[...Array(props.rating)].map((_, index) => (
                                <FaStar id={index + 1} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
