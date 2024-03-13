import styled from 'styled-components';
import { BASE_URL } from '../App';

const SearchResult = ({ data }) => {
    return (
        <FoodCardContainer>

            {data?.map((food) => (
                <FoodCard key={food.name}>

                    <div className="image">
                        <img src={BASE_URL + food.image} alt="" />
                    </div>

                    <div className="name">
                        <p>{food.name}</p>
                    </div>

                    <div className="desc">
                        <p>{food.text}</p>
                    </div>

                    <div className="price">
                        <p>PRICE:</p>  <Common>₹{food.price}</Common>
                    </div>

                    <div className="type">
                        <p>TYPE:</p> <Common>{food.type}</Common>
                    </div>

                </FoodCard>
            ))}

        </FoodCardContainer>
    );
};

export default SearchResult;

;

const FoodCardContainer = styled.section`
    height: calc(100vh - 241px);
    background-image: url("./images/bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    border: 5px solid grey;
    display: flex;
    gap: 50px;
    justify-content: center;
    align-items: center;
`;

const Common = styled.p`

color: white;
display: flex;

`

const FoodCard = styled.div`

width: 200px;
height: 320px;
background-color: gray;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 20px;
padding: 20px 5px;
cursor: pointer;


.image img{
    width: 100px;
    height: 100px;
}

.name p{
    font-size: 1.2rem;
    text-align: center;
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
}

.desc{
    margin-top: 12px;
    text-align: center;
    font-size: 1.2rem;

}

.price{

    margin-top: 15px;
    text-align: left;
    font-weight: 900;
    font-size: 1.1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    gap: 10px;

}

.type{
    margin-top: 15px;
    text-align: left;
    font-weight: 900;
    font-size: 1.1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    gap: 10px;
}

`;


