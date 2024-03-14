import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResult from './Components/SearchResult';

export const BASE_URL = "http://localhost:9000"


function App() {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {

    setLoading(true);

    const getData = async () => {

      try {

        const res = await fetch(BASE_URL);
        const json = await res.json();

        setData(json);
        setFilteredData(json)

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }


    }
    getData()
  }, []);

  if (error) return <div>Error! {error}</div>;
  if (loading) return <div>Loading</div>;


  // search functionality 
  const searchValue = (e) => {
    const value = e.target.value.trim().toLowerCase();

    const filter = data?.filter((food) => (
      food.name.toLowerCase().includes(value)
    ));

      setFilteredData(filter)
    
  };


  const buttonFilter = (type) => {

    if (type == "all") {
      setFilteredData(data);
      return
    }

    const filter = data?.filter((val) => (
      val.type.toLowerCase().includes(type.toLowerCase())
    ))

    setFilteredData(filter);

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
            <Button onClick={() => buttonFilter(val.type)} key={val.name}>{val.name}</Button>
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
