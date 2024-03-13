import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResult from './Components/SearchResult';

export const BASE_URL = "http://localhost:9000"


function App() {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(undefined);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("")

  useEffect(() => {
    const getFoodData = async () => {

      setLoading(true);

      try {

        const res = await fetch(BASE_URL);
        const jsonData = await res.json();
        setData(jsonData);
        setFilteredData(jsonData);
        setLoading(false);

      } catch (error) {

        setError("Could not retrieve data");

      }

    }
    getFoodData();
  }, [])

  if (error) return <h2>ERROR: {error}</h2>;
  if (loading) return <h2>LOADING...</h2>;

  const searchValue = (e) => {
    const value = e.target.value;

    const filter = data?.filter((food) => (

      food.name.toLowerCase().includes(value.toLowerCase())
    ));

    setFilteredData(filter)
  };

  const filteredFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
  
    const filter = data?.filter((food) => (
      food.type.toLowerCase().includes(type.toLowerCase())
    ));
    setFilteredData(filter);
    setSelectedBtn(type);
  }

  const filterBtns = [
    {
      name: "all",
      type: "all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    },
  ]



  return (

    <>
      <Main>

        <TopContainer>
          <img src="./images/f-zone.svg" alt="logo" />

          <input onChange={searchValue} type="text" placeholder='search Food...' />
        </TopContainer>

        <BottomContainer>
          {filterBtns.map((val) => (
            <Button key={val.name} onClick={() => filteredFood(val.type)} >{val.name}</Button>
          ))}
        </BottomContainer>
      </Main>

      <SearchResult data={filteredData} />

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
background-color:#f73333 ;
border: none;
border-radius: 5px;
font-size: 1.2rem;
cursor: pointer;
color: white;
transition: 0.5s ease;
border: 2px solid transparent;


&:hover{
  background-color: #fe0404;
  transition: 0.5s ease;
  color: black;
  border: 2px solid black;
}
`;
