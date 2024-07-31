import { Link } from "react-router-dom"




function App() {
  

  return (
    <>
    
    <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold uppercase">employee ms</h1>
      <p className="mb-5 capitalize">
      employee management system
      </p>
      <Link to={"/adminlogin"}>
      <button className="btn btn-primary capitalize">
        sign in
      </button>
      </Link>
      
    </div>
  </div>
</div>
    
    </>
  )
}

export default App
