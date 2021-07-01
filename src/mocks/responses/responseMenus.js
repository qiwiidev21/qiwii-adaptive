import Bengkel from "../../assets/images/bengkel.png";
import Bioskop from "../../assets/images/bioskop.png";
import Finance from "../../assets/images/finance.png";
import Kesehatan from "../../assets/images/kesehatan.png";
import Pemerintahan from "../../assets/images/pemerintah.png";
import Salon from "../../assets/images/salon.png";
import TempatWisata from "../../assets/images/tempat-wisata.png";
import Expedition from "../../assets/images/icon-expedition.png";
import Retail from "../../assets/images/icon-retail.png";

const responseMenus = {
  data: [
    {
      id: 1,
      title: "HealthCare",
      navigate: "kesehatan",
      icon: Kesehatan,
    },
    {
      id: 2,
      title: "Public Office",
      navigate: "pemerintahan",
      icon: Pemerintahan,
    },
    {
      id: 3,
      title: "Finance",
      navigate: "keuangan",
      icon: Finance,
    },
    {
      id: 4,
      title: "Beauty & Spa",
      navigate: "kecantikan",
      icon: Salon,
    },
    {
      id: 5,
      title: "Automotive",
      navigate: "services",
      icon: Bengkel,
    },
    {
      id: 6,
      title: "Retail",
      navigate: "services",
      icon: Retail,
    },
    {
      id: 7,
      title: "Expedition",
      navigate: "services",
      icon: Expedition,
    },
    {
      id: 8,
      title: "Sites/Spaces",
      navigate: "tempatwisata",
      icon: TempatWisata,
    },
    {
      id: 9,
      title: "Entertainment",
      navigate: "entertainment",
      icon: Bioskop,
    },
  ],
  message: "Selamat menu berhasil.",
  status: "Success",
};

export default responseMenus;
