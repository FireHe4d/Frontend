import React, { useEffect, useState } from 'react';
import EmptyView from '../../components/common/EmptyView';
import FilterPanel from '../../components/Home/FilterPanel';
import List from '../../components/Home/List';
import SearchBar from '../../components/Home/SearchBar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './styles.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Checkbox from "@material-ui/core/Checkbox";
import Pagination from "@material-ui/lab/Pagination";
import usePagination from "../../components/common/Pagination";
import Divider from "@material-ui/core/Divider";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import TryIcon from '@mui/icons-material/Try';
import LogoutIcon from '@mui/icons-material/Logout';
import AboutUs from "../Random";
import { Routes,Route, Link, BrowserRouter} from "react-router-dom";

const Home = () => {

  const instance = {
    baseURL: `https://tamaktar.herokuapp.com`
  }
  const requests = {
    fetchTypes: `/type`,
    fetchNations: `/nation`,
    fetchReceipts: `/recept`,
    fetchReceiptIngredient: `/recept/ingredient`,
    fetchIngredient: `/ingredient`,

  }

  const [ingList, setIngList] = useState([]);
  const [dataList, setDataList] = useState([]);

  const [type_receipts, setTypeofDish] = useState([]);
  const [nations, setNation]= useState([]);

  const [ing1List, setIng1List] = useState([]);

  useEffect(() => {
    async function fetchTypes() {
      const data = await fetch(`${instance.baseURL}${requests.fetchTypes}`);
      const res = await data.json();
      setTypeofDish(res);
    }
    async function fetchNations() {
      const data = await fetch(`${instance.baseURL}${requests.fetchNations}`);
      const res = await data.json();
      setNation(res);
    }
    async function fetchReceipt() {
      const data = await fetch(`${instance.baseURL}${requests.fetchReceipts}`);
      const res = await data.json();
      setDataList(res);
    }
    async function fetchIngredient() {
      const data = await fetch(`${instance.baseURL}${requests.fetchIngredient}`);
      const res = await data.json();
      setIngList(res);
    }
    fetchIngredient();
    fetchReceipt();
    fetchNations();
    fetchTypes();

  }, []);
  const [selectedVegan, setSelectedVegan] = useState(null);
  const [selectedSort, setSelectedSort] = useState("nosort");
  const [selectedSortAsc, setSelectedSortAsc] = useState(true);
  const [selectedArray, setSelectedArray] = useState([null]);

  const [selectedRating1, setSelectedRating1] = useState([0, 10]);
  const [selectedDiff, setSelectedDiff] = useState([0, 10]);
  const [selectedView, setSelectedView] = useState([0,30000]);


  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');
    const [list, setList] = useState([]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(list.length / PER_PAGE);
  const _DATA = usePagination(list, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleSelectVegan = (event, value) =>
    !value ? null : setSelectedVegan(value);

  const handleNullVegan = () =>
        setSelectedVegan(null);

  const handleChangeCheckedType = (type_id) => {
    const typeStateList = type_receipts;
    const changeCheckedTypes = typeStateList.map((item) =>
      item.type_id === type_id ? { ...item, checked: !item.checked } : item
    );
    setTypeofDish(changeCheckedTypes);
  };

  const handleChangeCheckedNation = (nation_id) => {
    const nationStateList = nations;
    const changeCheckedNations = nationStateList.map((item) =>
      item.nation_id === nation_id ? { ...item, checked: !item.checked } : item
    );
    setNation(changeCheckedNations);
  };
  const handleChangeIngre = (event, value) => {
    setIng1List(value);
  };
  const handleChangeSortAsc = (event,value) => {
    setSelectedSortAsc(event.target.checked);

  };
  const handleChangeArray = (event,value) => {
    var arr = [];
    arr.push(selectedSort, selectedSortAsc);

    setSelectedArray(arr);
  };
  const handleChangeSort = (event,value) => {
    setSelectedSort(event.target.value);
  };
  const handleChangeDiff = (event, value) => {
    setSelectedDiff(value);
  };
  const handleChangeRating1 = (event, value) => {
    setSelectedRating1(value);
  };
  const handleChangeView = (event, value) => {
    setSelectedView(value);
  };
  const logout = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("refreshKey")
    localStorage.removeItem("user_name")
  }

  const applyFilters = () => {
    let updatedList = dataList;

    // Category Filter
    if (selectedVegan) {
      updatedList = updatedList.filter(
        (item) => item.isvegan + 4 === selectedVegan.length || item.isvegetarian + 9 === selectedVegan.length
      );

    }


    //type filter
    const typeofDishChecked = type_receipts
      .filter((item) => item.checked)
      .map((item) => item.type_id);

    if (typeofDishChecked.length) {
      updatedList = updatedList.filter((item) =>
        typeofDishChecked.includes(item.type_id)
      );
    }
    //filter nation
    const nationChecked = nations
      .filter((item) => item.checked)
      .map((item) => item.nation_id);

    if (nationChecked.length) {
      updatedList = updatedList.filter((item) =>
        nationChecked.includes(item.nation_id)
      );
    }
    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.recept_name.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    //ingre

    if (ing1List) {
      let result = [];

      for(var i in ing1List)
        result.push(" "+ing1List[i].id);
       result = result.map(Number)



      updatedList = updatedList.filter(
          (item) => result.every(element => {
            return item.ingredient.includes(element);
          })
      );

    }

    // Diff Filter
    const minPriceDiff = selectedDiff[0];
    const maxPriceDiff = selectedDiff[1];

    updatedList = updatedList.filter(
      (item) => item.level_id >= minPriceDiff && item.level_id <= maxPriceDiff
    );
    //Ratings Filter
    const minRatings = selectedRating1[0];
    const maxRatings = selectedRating1[1];

    updatedList = updatedList.filter(
        (item) => item.ratinglvl >= minRatings && item.ratinglvl <= maxRatings
    );
    // View Filter
    const minPriceView = selectedView[0];
    const maxPriceView = selectedView[1];

    updatedList = updatedList.filter(
      (item) => item.recept_view >= minPriceView && item.recept_view <= maxPriceView
    );

    setList(updatedList);





     if(selectedArray[0]==="name"&& selectedArray[1]===true){

       updatedList.sort(function(a, b) {
         return a.recept_name.localeCompare(b.recept_name) ;
       });
       updatedList.sort();
     }
      if(selectedArray[0]==="nation"&& selectedArray[1]===true){
        updatedList.sort(function(a, b) {
          return a.nation_id - b.nation_id ;
        });
        updatedList.sort();
      }
      if(selectedArray[0]==="type"&& selectedArray[1]===true){
        updatedList.sort(function(a, b) {
          return a.type_id - b.type_id ;
        });
        updatedList.sort();
      }
      if(selectedArray[0]==="diff"&& selectedArray[1]===true){
        updatedList.sort(function(a, b) {
          return a.level_id - b.level_id ;
        });
        updatedList.sort();
      }
      if(selectedArray[0]==="view"&& selectedArray[1]===true){
        updatedList.sort(function(a, b) {
          return a.recept_view - b.recept_view ;
        });
        updatedList.sort();
      }
      if(selectedArray[0]==="rating"&& selectedArray[1]===true){
        updatedList.sort(function(a, b) {
          return a.ratinglvl - b.ratinglvl ;
        });
        updatedList.sort();
      };


      if(selectedArray[0]==="name"&& selectedArray[1]===false){
        updatedList.sort(function(a, b) {
          return a.recept_name.localeCompare(b.recept_name) ;
        });
        updatedList.sort().reverse();
      }
      if(selectedArray[0]==="nation"&& selectedArray[1]===false){
        updatedList.sort(function(a, b) {
          return a.nation_id - b.nation_id ;
        });
        updatedList.sort().reverse();

      }
      if(selectedArray[0]==="type"&& selectedArray[1]===false){
        updatedList.sort(function(a, b) {
          return a.type_id - b.type_id ;
        });
        updatedList.sort().reverse();

      }
      if(selectedArray[0]==="diff"&& selectedArray[1]===false){
        updatedList.sort(function(a, b) {
          return a.level_id - b.level_id ;
        });
        updatedList.sort().reverse();

      }
      if(selectedArray[0]==="view"&& selectedArray[1]===false){
        updatedList.sort(function(a, b) {
          return a.recept_view - b.recept_view ;
        });
        updatedList.sort().reverse();

      }
      if(selectedArray[0]==="rating"&& selectedArray[1]===false){
        updatedList.sort(function(a, b) {
          return a.ratinglvl - b.ratinglvl ;
        });
        updatedList.sort().reverse();

      };


    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {

      applyFilters();

  }, [ searchInput, type_receipts, nations, selectedVegan, selectedDiff, selectedView,selectedRating1,ing1List,selectedArray]);

  return (


    <div className='home'>
      <div className='parent'>
        <div className="wrapper child1">
          <input type="checkbox" id="btn" hidden />
          <label htmlFor="btn" className="menu-btn">
            <MenuIcon />
            <ExpandLessIcon />
          </label>
          <nav id="sidebar">
            <div className="title">Receipt Menu</div>

              <ul className="list-items">
              <li>
                <h1>Main</h1>
              </li>
              <li>
                <Link to="/">
                  <HomeIcon />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/random">
                  <ShuffleIcon />
                  Random Receipts
                </Link>
              </li>
              <li>
                <Link to="/trend">
                  <WhatshotIcon />
                  Trending
                </Link>
              </li>
              <li>
                <h1>Account</h1>
              </li>
             
              <li>
              <Link to="/auth">
                {localStorage.getItem("currentUser") == null?  <LoginIcon />:
           "" }
               {localStorage.getItem("currentUser") == null?  "Login":
             ""}
                  
                  </Link>
              </li>
              <li>
              <Link to="/register">
                {localStorage.getItem("currentUser") == null?  <HowToRegIcon />:
            "" }
               {localStorage.getItem("currentUser") == null?  "Register":
             ""}
                 
                 </Link>
              </li>
              
              <li>
              <Link to="/profile">
                {localStorage.getItem("currentUser") == null?  "":
            <AccountBoxIcon /> }
               {localStorage.getItem("currentUser") == null?  "":
             "Profile"}
                  
                  </Link>
              </li>
              <li>
              <Link to="/favorite">
                {localStorage.getItem("currentUser") == null?  "":
            <FavoriteIcon /> }
               {localStorage.getItem("currentUser") == null?  "":
             "Favorite"}
                  
                  </Link>
              </li>
              <li>
              <Link to="/remember">
                {localStorage.getItem("currentUser") == null?  "":
            <BookIcon /> }
               {localStorage.getItem("currentUser") == null?  "":
             "Remember"}
                  
                  </Link>
              </li>
              <li>
              <Link to="/tried">
                {localStorage.getItem("currentUser") == null?  "":
            <TryIcon /> }
               {localStorage.getItem("currentUser") == null?  "":
             "Tried"}
                  
                  </Link>
              </li>
              <li>
              <Link to="/" onClick={logout}>
                {localStorage.getItem("currentUser") == null?  "":
            <LogoutIcon /> }
               {localStorage.getItem("currentUser") == null?  "":
             "Logout"}
                  
                  </Link>
              </li>
              <li>
                <h1>Service</h1>
              </li>
              <li>
                <a href="/setting">
                  <SettingsIcon />
                  Setting
                </a>
              </li>

                <div className="icons">
                  <a href="#" aria-label="Facebook">
                    {" "}
                    <FacebookIcon />
                  </a>
                  <a href="#" aria-label="twitter">
                    <FacebookIcon />
                  </a>
                  <a href="#" aria-label="Github">
                    <FacebookIcon />
                  </a>
                  <a href="#" aria-label="youtube">
                    <FacebookIcon />
                  </a>
                </div>
              </ul>

          </nav>
        </div>

        <div className='child2'>
          {/* Search Bar */}
          <SearchBar
              value={searchInput}
              changeInput={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className='child4'>

        <select name="column" id="cars" value={selectedSort} onChange={handleChangeSort}>
          <option value="nosort">No</option>
          <option value="name">Receipt Name</option>
          <option value="nation">Nation</option>
          <option value="type">Type</option>
          <option value="diff">Difficulty</option>
          <option value="view">View</option>
          <option value="rating">Rating</option>


        </select>

          </div>
          <div className='child4'>

            <Checkbox
                checked={selectedSortAsc}
                onChange={handleChangeSortAsc}
                inputProps={{ 'aria-label': 'controlled' }}
                color="primary"
            />


          </div >
        <div className='child4'>

          <button class="glow-on-hover" onClick={handleChangeArray} type="button">Apply Sorting</button>



        </div >
      </div>
      <div className='home_panelList-wrap'>
        {/* Filter Panel */}
        <div className='home_panel-wrap'>
          <FilterPanel
            selectedVegan={selectedVegan}
            selectVegan={handleSelectVegan}
            type_receipts={type_receipts}
            changeCheckedType={handleChangeCheckedType}
            nations={nations}
            changeCheckedNation={handleChangeCheckedNation}
            selectedDiff={selectedDiff}
            changeDiff={handleChangeDiff}
            selectedRating1={selectedRating1}
            changeRating1={handleChangeRating1}
            selectedView={selectedView}
            changeView={handleChangeView}
            nulifyVegan={handleNullVegan}
            ingList={ingList}
            changeIngre={handleChangeIngre}
            ing1List={ing1List}
          />
        </div>
        <Divider orientation="vertical" flexItem></Divider>


        {/* List & Empty View */}
        <div className='home_list-wrap'>
          {resultsFound ? <List list={_DATA.currentData()}  type_receipts={type_receipts} nations={nations} ingList={ingList}/> : <EmptyView />}
        </div>
        <Divider orientation="vertical" flexItem></Divider>
        <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
        />
      </div>
    </div>
  );
};


export default Home;
