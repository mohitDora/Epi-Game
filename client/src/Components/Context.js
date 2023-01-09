import React, { createContext, useState, useEffect } from 'react'

export const Card = createContext()



const getLSDataCART = () => {
  let data = localStorage.getItem("cart");
  if (data) {
    return JSON.parse(localStorage.getItem("cart"))
  }
  else {
    return []
  }
}
const getLSDataWISH = () => {
  let data = localStorage.getItem("wishlist");
  if (data) {
    return JSON.parse(localStorage.getItem("wishlist"))
  }
  else {
    return []
  }
}
const getLSDatalib = () => {
  let data = localStorage.getItem("librarydata");
  if (data) {
    return JSON.parse(localStorage.getItem("librarydata"))
  }
  else {
    return []
  }
}

function Context({ children }) {



  const [togglesort, settogglesort] = useState(false);
  const [browsedata, setbrowsedata] = useState([]);
  const [count,setcount]=useState(0);
  const [page, setpage] = useState(1);
  const [twonav, settwonav] = useState("discover");
  const [filtshow, setfiltshow] = useState(false)
  const [isloading, setisloading] = useState(true)
  const [name, setname] = useState("");
  const [showsearch,setshowsearch]=useState(true)
  const [userdetails, setuserdetails] = useState({})
  const [togglesearch, settogglesearch] = useState(false);
  const [filter, setfilter] = useState(false);
  const [totalpage,settotalpage]=useState(1);
  const [cart, setcart] = useState(getLSDataCART());
  const [wishlist, setwishlist] = useState(getLSDataWISH());
  const [library, setlibrary] = useState(getLSDatalib());
  const [showcheckout,setcheckout]=useState(false)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])
  useEffect(() => {
    localStorage.setItem("librarydata", JSON.stringify(library))
  }, [library])

  return (
    <Card.Provider value={{ totalpage,settotalpage,showsearch,setshowsearch,togglesort,library, setlibrary,count,setcount, filter,showcheckout,setcheckout, setfilter, name, cart, wishlist, setwishlist, setcart, userdetails, setuserdetails, setname, filtshow, setfiltshow, settogglesort, browsedata, setbrowsedata, page, setpage, twonav, settwonav, isloading, setisloading, togglesearch, settogglesearch }}>
      {children}
    </Card.Provider>
  )
}

export default Context