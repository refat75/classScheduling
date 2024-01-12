import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div>
      This Is Home Page <br />
      Go to Dashboard <br />
      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  )
}

export default Home
