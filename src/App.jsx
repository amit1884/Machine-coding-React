import './App.css'
import Comments from './pages/Comment'
import Counter from './pages/Counter/Counter'
import CustomCheckbox from './pages/CustomCheckbox'
import FileExplorer from './pages/FileSystem/FileExplorer'
import InfiniteScroll from './pages/InfiniteScroll.jsx/InfiniteScroll'
import Metronome from './pages/MetroNome/Metronome'
import OtpInput from './pages/OTPInput/OtpInput'
import Pagination from './pages/Pagination'
import ProgressBar from './pages/ProgressBar/ProgressBar'
import StarRating from './pages/StarRating'
const options=[
  {
    id:1,name:'Amit'
  },
   {
    id:2,name:'Mohit'
  },
   {
    id:3,name:'Aditya'
  },
   {
    id:4,name:'Abhishek'
  },
   {
    id:5,name:'Priyanshu'
  },
   {
    id:6,name:'Amar'
  },
   {
    id:7,name:'Roshan'
  },
   {
    id:8,name:'Rohit'
  }

]
function App() {

  return (
    <>
      <div>
       <CustomCheckbox options={options}/>
       <StarRating/>
       </div>
    </>
  )
}

export default App
