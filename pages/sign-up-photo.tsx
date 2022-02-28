import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { setSignUp } from "../services/auth";
import { getGameCategory } from "../services/player";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CategoryTypes } from "../services/data-types";

export default function SignUpPhoto() {
  const [categories, setCategories] = useState([]);
  const [favourite, setFavourite] = useState("");
  const [image, setImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [localForm, setLocalForm] = useState({
    name: "",
    email: "",
  });
  const router = useRouter();
  const getGameCategoryAPI = useCallback(async () => {
    const data = await getGameCategory();
    setCategories(data);
    setFavourite(data[0]._id);
  }, [getGameCategory]);

  useEffect(() => {
    getGameCategoryAPI();
  }, []);

  useEffect(() => {
    const getLocalForm = localStorage.getItem("dataForm");
    setLocalForm(JSON.parse(getLocalForm!));
  }, []);

  const onSubmit = async () => {
    const getLocalForm = await localStorage.getItem("dataForm");
    const form = JSON.parse(getLocalForm!);
    const data = new FormData();
    data.append("image", image);
    data.append("email", form.email);
    data.append("name", form.name);
    data.append("password", form.password);
    data.append("username", form.name);
    data.append("phoneNumber", "12211121");
    data.append("role", "user");
    data.append("status", "Y");
    data.append("favourite", favourite);

    const result = await setSignUp(data);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success("Register Success");
      router.push("/sign-up-success");
      localStorage.removeItem("dataForm");
    }
  };

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">{imagePreview ? <img className="img-upload" width={120} height={120} src={imagePreview} alt="photo" /> : <Image src="/icon/upload.svg" width={120} height={120} alt="photo" />}</label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const img = e.target.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      setImage(img);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">{localForm.name}</h2>
              <p className="text-lg text-center color-palette-1 m-0">{localForm.email}</p>
              <div className="pt-50 pb-50">
                <label htmlFor="category" className="form-label text-lg fw-medium color-palette-1 mb-10">
                  Favorite Game
                </label>
                <select value={favourite} onChange={(e) => setFavourite(e.target.value)} id="category" name="category" className="form-select d-block w-100 rounded-pill text-lg" aria-label="Favorite Game">
                  {categories.map((category: CategoryTypes) => {
                    return (
                      <option key={category._id} value={category._id} selected>
                        {category.name}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button onClick={onSubmit} className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16" type="button">
                Create My Account
              </button>
              <a className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15" href="#" role="button">
                Terms & Conditions
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
