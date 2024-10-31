import style from './Search.module.scss'

interface SearchProps{
    search: string;
    setSearch: (value: string) => void;
    handleSearch: () => void;  
}

const Search = ({ search, setSearch, handleSearch }: SearchProps) => {
  return (
    <div className={style.searchbar}>
        <input 
            type="text"
            className="searchtxt"
            placeholder="Enter City Name "
            name="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)} />
        
        <button className="searchbtn" onClick={handleSearch}>
            Get Weather
        </button>
    </div>
  )
}

export default Search