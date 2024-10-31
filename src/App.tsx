import styles from './App.module.scss'
import Weather from "./components/weather/Weather"

function App() {
  

  return (
    <div className={styles.root}>
      <Weather />
    </div>
  )
}

export default App
