import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResult from './Components/SearchResult';

export const BASE_URL = "http://localhost:9000"



const foodnaem = {
  name: "Boilded Egg",
  price: 10,
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  image: "/images/egg.png",
  type: "breakfast"
}


function App() {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(undefined);

  useEffect(() => {
    const getFoodData = async () => {

      setLoading(true);

      try {

        const res = await fetch(BASE_URL);
        const jsonData = await res.json();
        setData(jsonData);
        setLoading(false);

      } catch (error) {

        setError("Could not retrieve data");

      }

    }
    getFoodData();
  }, [])

  if (error) return <h2>ERROR: {error}</h2>;
  if (loading) return <h2>LOADING...</h2>;


  return (

    <>
      <Main>

        <TopContainer>
          <img src="./images/f-zone.svg" alt="logo" />

          <input type="text" placeholder='search Food...' />
        </TopContainer>

        <BottomContainer>
          <Button>All</Button>
          <Button>Breakfast</Button>
          <Button>Lunch</Button>
          <Button>Dinner</Button>
        </BottomContainer>
      </Main>

      <SearchResult data={data} />

    </>
  )
}

export default App

const Main = styled.div`
background-color:#323334;
height: 241px;

`;

const TopContainer = styled.div`

display: flex;
justify-content: space-between;
padding: 50px 50px 0px 50px;
input{
  width: 285px;
  border: 2px solid #FF0909;
  padding: 10px 15px;
  border-radius: 10px;
}

`;

const BottomContainer = styled.div`

display: flex;
justify-content: center;
margin-top: 50px;
gap: 25px;

`;

const Button = styled.button`

padding: 6px 12px;
background-color:#FF0909 ;
border: none;
border-radius: 5px;
font-size: 1.2rem;
cursor: pointer;
color: white;

`;
