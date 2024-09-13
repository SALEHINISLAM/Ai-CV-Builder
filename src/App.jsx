import { useUser } from "@clerk/clerk-react";
import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"
import NavbarComponent from "./components/Navbar";
import FooterComponent from "./components/FooterComponent";
import { Toaster } from "./components/ui/toaster";

function App() {
  const {user, isLoaded, isSignedIn}=useUser()
  
  if (!isLoaded) {
    return <Skeleton className={'rounded-full'}/>
  }
  if (!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/signIn'}/>
  }
  console.log(user)
  return (
    <>
      <div className="mb-16">
        <NavbarComponent/>
      </div>
      <Outlet />
      <h1>footer</h1>
      <FooterComponent/>
      <Toaster/>
    </>
  );
}

export default App;
