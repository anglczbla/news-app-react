import { useContext } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
const Dashboard = () => {
  const { news } = useContext(NewsContext);
  console.log("isi news", news);

  return (
    <div>
      <h1>Featured News</h1>
      {news.map((item) => (
        <div key={item.id}>
          <ul>
            <li>ID: {item.id}</li>
            <li>Title: {item.title}</li>
            <li>Body{item.body}</li>
          </ul>
        </div>
      ))}
      <Link to="/news">See All News</Link>
    </div>
  );
};

export default Dashboard;
