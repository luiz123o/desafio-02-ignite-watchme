 import { SideBar } from './components/SideBar';
 import { Content } from './components/Content';



import './styles/global.scss';
import './styles/app.scss'

import { MoviesProvider } from './contexts/movies';




export function App() { 

  return (
    <div className="container-app">
    <MoviesProvider>
    <SideBar/>
    <Content />
    </MoviesProvider>
    </div>
  )
}