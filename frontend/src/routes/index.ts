import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Person from "../pages/Person";

export const routers = [
    {path:'/home', element:Home, name:"Home", nav:true},
    {path:'/catalog', element:Catalog, name:"Catalog", nav:true},
    {path:'/person/:id', element:Person, nav:false},
]