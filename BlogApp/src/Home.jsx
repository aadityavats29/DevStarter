import Navbar from './components/navbar/navbar';
import Login from './components/login/login';
import {BrowserRouter,Routes,Route,Outlet,Navigate} from 'react-router-dom';
import Intro from './components/Intro/intro';
import SignIn from './components/signin/signin';
import Blog from './components/Blog/blog';
import CreateBlog from './components/createBlog/createBlog';
import EditBlog from './components/editBlog/editBlog';
import ReadBlog from './components/readBlog/ReadBlog';
import User from './components/User/user';
import About from './components/Intro/about';
import Contact from './components/Intro/contact';

const PrivateRouteBlog = ()=>{
    return localStorage.getItem("userId") ?
    <>
        <Outlet/>
    </>:
    <Navigate replace to="/"/>
}

const PrivateRoute = ()=>{
    return localStorage.getItem("userId") ?
    <Navigate replace to="/"/>
    :
    <>
        <Outlet/>
    </>
}   

const Home = ()=>{
    return (<>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Intro/>} />
                <Route element={<PrivateRoute/>} >
                    <Route path='/login' element={<Login/>} />
                    <Route path='/signin' element={<SignIn/>} />
                </Route>
                <Route element={<PrivateRouteBlog/>} >
                    <Route path='/blogs' element={<Blog/>} />
                    <Route path='/blog/:blogId' element={<ReadBlog/>} />
                    <Route path='/createblog' element={<CreateBlog/>} />
                    <Route path='/editblog/:blogId' element={<EditBlog/>} />
                    <Route path='/user' element={<User/>} />
                </Route>
                <Route path='*' element={<Navigate replace to="/"/>}  />
                <Route path='/about' element={<About/>}/>
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    </>)
}
export default Home;