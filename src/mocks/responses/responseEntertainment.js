import Bioskop from "../../assets/images/cinema.png";
import Event from "../../assets/images/icon-event.png";
import PhotoStudio from "../../assets/images/foto-studio.png";
import Gym from "../../assets/images/icon-gym.png";
import Karaoke from "../../assets/images/karaoke.png";
import Mall from "../../assets/images/icon-mall.png";
import Resto from "../../assets/images/tempat-makan.png";

const responseMenus = {
  data: [
    {
      id: 1,
      title: "Event",
      navigate: "events",
      icon: Event,
    },
    {
      id: 2,
      title: "PhotoStudio",
      navigate: "photoStudio",
      icon: PhotoStudio,
    },
    {
      id: 3,
      title: "Bioskop",
      navigate: "bioskop",
      icon: Bioskop,
    },
    {
      id: 4,
      title: "Karaoke",
      navigate: "karaoke",
      icon: Karaoke,
    },
    {
      id: 5,
      title: "Cafe",
      navigate: "cafe",
      icon: Resto,
    },
    {
      id: 6,
      title: "Mall",
      navigate: "mall",
      icon: Mall,
    },
    {
      id: 7,
      title: "Gym & Sport Center",
      navigate: "gym",
      icon: Gym,
    },
  ],
  message: "Selamat menu berhasil.",
  status: "Success",
};

export default responseMenus;
