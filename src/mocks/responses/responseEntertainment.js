import Bioskop from "../../assets/images/cinema.png";
import Event from "../../assets/images/icon-event.png";
import PhotoStudio from "../../assets/images/foto-studio.png";
import TempatWisata from "../../assets/images/tempat-wisata.png";

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
      title: "TempatWisata",
      navigate: "tempatWisata",
      icon: TempatWisata,
    },
    {
      id: 4,
      title: "Bioskop",
      navigate: "bioskop",
      icon: Bioskop,
    },
  ],
  message: "Selamat menu berhasil.",
  status: "Success",
};

export default responseMenus;
