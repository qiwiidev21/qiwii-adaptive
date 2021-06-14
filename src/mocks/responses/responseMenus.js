import Bengkel from "../../assets/images/bengkel.png";
import Bioskop from "../../assets/images/bioskop.png";
import Finance from "../../assets/images/finance.png";
import Kesehatan from "../../assets/images/kesehatan.png";
import Pemerintahan from "../../assets/images/pemerintah.png";
import Salon from "../../assets/images/salon.png";

const responseMenus = {
  data: [
    {
      id: 1,
      title: "Kesehatan",
      navigate: "kesehatan",
      icon: Kesehatan,
    },
    {
      id: 2,
      title: "Pemerintah",
      navigate: "pemerintahan",
      icon: Pemerintahan,
    },
    {
      id: 3,
      title: "Keuangan",
      navigate: "keuangan",
      icon: Finance,
    },
    {
      id: 4,
      title: "Kecantikan",
      navigate: "kecantikan",
      icon: Salon,
    },
    {
      id: 5,
      title: "Bengkel",
      navigate: "services",
      icon: Bengkel,
    },
    {
      id: 6,
      title: "Hiburan",
      navigate: "entertainment",
      icon: Bioskop,
    },
  ],
  message: "Selamat menu berhasil.",
  status: "Success",
};

export default responseMenus;
