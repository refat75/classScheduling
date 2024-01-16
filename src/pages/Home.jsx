import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div>
      This Is Home Page <br />
      Go to Dashboard <br />
      <Link to="/dashboard">
        <button>User Dashboard</button>
      </Link>
      <Link to = "/admindashboard">
        <button>Admin Dashboard</button>
      </Link>
    </div>
  )
}

export default Home
