import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("isi current user", currentUser);

  const dummyNews = [
    {
      id: "1",
      title: "Breaking: AI Technology Revolutionizes Healthcare",
      body: "Artificial Intelligence is transforming the healthcare industry with unprecedented accuracy in disease diagnosis. Researchers have developed new AI models that can detect early signs of cancer with 95% accuracy, potentially saving millions of lives worldwide.",
    },
    {
      id: "2",
      title: "Global Climate Summit Reaches Historic Agreement",
      body: "World leaders gathered at the United Nations Climate Summit have reached a groundbreaking agreement to reduce carbon emissions by 50% by 2030. This historic deal marks a significant step forward in the fight against climate change.",
    },
    {
      id: "3",
      title: "Tech Giants Announce Revolutionary Quantum Computer",
      body: "Leading technology companies have unveiled the world's first commercially viable quantum computer. This breakthrough promises to revolutionize fields ranging from cryptography to drug discovery, with processing speeds millions of times faster than traditional computers.",
    },
    {
      id: "4",
      title: "New Study Reveals Benefits of Mediterranean Diet",
      body: "A comprehensive 10-year study involving 100,000 participants has confirmed the numerous health benefits of the Mediterranean diet. Researchers found significant reductions in heart disease, diabetes, and cognitive decline among those following this eating pattern.",
    },
    {
      id: "5",
      title: "Space Exploration: Mission to Mars Successfully Launched",
      body: "The international space agency has successfully launched a historic mission to Mars, carrying advanced equipment to search for signs of past or present life. The spacecraft is expected to reach the Red Planet in approximately seven months.",
    },
    {
      id: "6",
      title: "Electric Vehicles Surpass Traditional Cars in Sales",
      body: "For the first time in automotive history, electric vehicle sales have exceeded those of traditional gasoline-powered cars. This milestone represents a major shift in the transportation industry and signals the acceleration of the green energy transition.",
    },
    {
      id: "7",
      title: "Education Reform: Digital Learning Shows Promising Results",
      body: "A nationwide initiative implementing digital learning platforms in schools has shown remarkable improvements in student performance. Early results indicate a 30% increase in engagement and comprehension across all subjects.",
    },
    {
      id: "8",
      title: "Breakthrough in Renewable Energy Storage Technology",
      body: "Scientists have developed a revolutionary battery technology that can store renewable energy for up to six months without significant loss. This innovation could solve one of the biggest challenges facing the renewable energy sector.",
    },
  ];

  const getInitialNews = () => {
    const storedNews = localStorage.getItem("news");
    if (storedNews && storedNews !== "[]") {
      return JSON.parse(storedNews);
    } else {
      // kalau localStorage kosong, pakai dummy data dan simpan ke localStorage
      localStorage.setItem("news", JSON.stringify(dummyNews));
      return dummyNews;
    }
  };

  const [news, setNews] = useState(getInitialNews());
  const [favNews, setFavNews] = useState(
    JSON.parse(localStorage.getItem("favnews")) || []
  );
  console.log("isi fav news", favNews);

  const [formNews, setFormNews] = useState({
    id: "",
    title: "",
    body: "",
  });
  const [editNews, setEditNews] = useState({
    id: "",
    title: "",
    body: "",
  });
  const [showToggleNews, setShowToggleNews] = useState(null);

  useEffect(() => {
    const dataNews = localStorage.getItem("news");
    if (dataNews) {
      const data = JSON.parse(dataNews);
      setNews(Array.isArray(data) ? data : []);
    }

    const dataFavNews = localStorage.getItem("favnews");
    if (dataFavNews) {
      const data = JSON.parse(dataFavNews);
      setFavNews(Array.isArray(data) ? data : []);
    }
  }, []);

  const handleChangeNews = (e) => {
    const { name, value } = e.target;
    setFormNews({ ...formNews, [name]: value });
  };

  const handleChangeEditNews = (e) => {
    const { name, value } = e.target;
    setEditNews({ ...editNews, [name]: value });
  };

  const addNews = (e) => {
    e.preventDefault();

    const newNewsList = [...news, { ...formNews }];
    setNews(newNewsList);
    localStorage.setItem("news", JSON.stringify(newNewsList));

    setFormNews({
      id: "",
      title: "",
      body: "",
    });
  };

  const deleteNews = (id) => {
    const deleteNewNews = news.filter((item) => item.id !== id);
    setNews(deleteNewNews);
    localStorage.setItem("news", JSON.stringify(deleteNewNews));
  };

  const toggleNews = (item, index) => {
    setShowToggleNews(index);
    setEditNews(item);
  };

  const saveEdit = (item, editNews) => {
    const newNewsEdit = news.map((newss) =>
      newss.id === item.id
        ? {
            id: editNews.id,
            title: editNews.title,
            body: editNews.body,
          }
        : newss
    );
    setNews(newNewsEdit);
    localStorage.setItem("news", JSON.stringify(newNewsEdit));
    setShowToggleNews(null);
  };

  const favoriteNews = (item, email) => {
    // user add fav news -> ngebentuk object yg berisi email dan items sbg key, yg dmna
    // items itu berisi value array of object dari berbagi news yg di favorite user
    // case 1
    // user blm pernah add favnews sama sekali -> ngebntuk object berisi email dan items dg value aof
    // case 2
    // user sudah perna favorite, mapping object lama dan di tambah dengan news baru

    // cek dlu udah ada blm isinya
    // const sudahAda = favNews.find(i => i.id == )
    // currentUser.email === database favNews (emailnya)

    const isExistEmail = favNews.find((news) => news.email == email) != null;
    console.log(isExistEmail);
    console.log(
      "testing",
      favNews.find((news) => news.email == email)
    );

    if (isExistEmail) {
      // case 2
      // user sudah perna favorite, mapping object lama dan di tambah dengan news baru
      const newDataEmail = favNews.map(function (news) {
        if (news.email == email) {
          return {
            ...news,
            items: [item, ...news.items],
          };
        } else {
          return news;
        }
      });
      setFavNews(newDataEmail);
      localStorage.setItem("favnews", JSON.stringify(newDataEmail));
    } else {
      // case 1
      // user blm pernah add favnews sama sekali -> ngebntuk object berisi email dan items dg value aof
      const newFavNews = {
        email: email,
        items: [item],
      };
      const data = [...favNews, newFavNews];
      setFavNews(data);
      localStorage.setItem("favnews", JSON.stringify(data));
    }
  };

  const alreadyFavorite = (id) => {
    if (!currentUser) return false;

    const user = favNews.find((u) => u.email === currentUser.email);

    if (!user) return false;

    return user.items.some((item) => item.id === id);
  };

  const deleteFavNews = (id) => {
    if (!currentUser) return;

    const newFavNews = favNews.map((u) => {
      if (u.email === currentUser.email) {
        return {
          ...u,
          items: u.items.filter((item) => item.id !== id),
        };
      } else {
        return u;
      }
    });

    setFavNews(newFavNews);
    localStorage.setItem("favnews", JSON.stringify(newFavNews));
  };

  return (
    <NewsContext.Provider
      value={{
        news,
        favNews,
        formNews,
        editNews,
        showToggleNews,
        handleChangeNews,
        handleChangeEditNews,
        addNews,
        deleteNews,
        toggleNews,
        saveEdit,
        favoriteNews,
        deleteFavNews,
        alreadyFavorite,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
