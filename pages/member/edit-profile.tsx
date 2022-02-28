import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/atoms/Input";
import SideBar from "../../components/organisms/Sidebar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";
import { updateProfile } from "../../services/member";

/* eslint-disable jsx-a11y/no-redundant-roles */

interface userProps {
  avatar: any;
  id: string;
  name: string;
  email: string;
}
export default function EditProfile() {
  const [user, setUser] = useState<userProps>({
    name: "",
    id: "",
    email: "",
    avatar: "",
  });
  const [imagePreview, setImagePreview] = useState("/");
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const dataUser: UserTypes = payload.player;
      const IMG = process.env.NEXT_PUBLIC_IMG;
      dataUser.avatar = `${IMG}/${dataUser.avatar}`;
      setUser(dataUser);
    }
  }, []);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("avatar", user.avatar);
    data.append("name", user.name);
    const response = await updateProfile(data, user.id);
    if (response.error) {
      toast.error(response.message);
    } else {
      Cookies.remove("token");
      router.push("/sign-in");
    }
  };
  return (
    <>
      <section className="edit-profile overflow-auto">
        <SideBar activeMenu="settings" />
        <main className="main-wrapper">
          <div className="ps-lg-0">
            <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
            <div className="bg-card pt-30 ps-30 pe-30 pb-30">
              <form action="">
                <div className="photo d-flex">
                  <div className="position-relative me-20">
                    {imagePreview === "/" ? (
                      <img src={user.avatar} width="90" height="90" className="avatar img-fluid" alt="avatar" style={{ borderRadius: "100%" }} />
                    ) : (
                      <img src={imagePreview} width="90" height="90" className="avatar img-fluid" alt="avatar" style={{ borderRadius: "100%" }} />
                    )}

                    <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                      <img src="/icon/upload.svg" alt="upload" />
                    </div>
                  </div>
                  <div className="image-upload">
                    <label htmlFor="avatar">
                      <img src="/icon/upload.svg" alt="upload" width={90} height={90} />
                    </label>
                    <input
                      onChange={(e) => {
                        const img = e.target.files![0];
                        setImagePreview(URL.createObjectURL(img));
                        return setUser({
                          ...user,
                          avatar: img,
                        });
                      }}
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/png, image/jpeg"
                    />
                  </div>
                </div>
                <div className="pt-30">
                  <Input label="Full Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>
                <div className="pt-30">
                  <Input label="Email Address" value={user.email} disabled />
                </div>
                {/* <div className="pt-30">
                  <Input label="Phone" />
                </div> */}
                <div className="button-group d-flex flex-column pt-50">
                  <button type="button" className="btn btn-save fw-medium text-lg text-white rounded-pill" onClick={onSubmit}>
                    Save My Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
