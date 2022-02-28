import Footer from "./Footer";
import Profile from "./Profile";
import MenuItem from "./MenuItem";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface SideBarProps {
  activeMenu: "overview" | "transactions" | "settings";
}
export default function SideBar(props: SideBarProps) {
  const { activeMenu } = props;
  const route = useRouter();
  const onLogOut = () => {
    Cookies.remove("token");
    route.push("/sign-in");
  };
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem title="Overview" icon="menuoverview" href="/member" active={activeMenu === "overview"} />
          <MenuItem title="Transaction" icon="menutransaction" href="/member/transaction" active={activeMenu === "transactions"} />
          <MenuItem title="Messages" icon="menumessages" href="/member" />
          <MenuItem title="Card" icon="menucard" href="/member" />
          <MenuItem title="Rewards" icon="menurewards" href="/member" />
          <MenuItem title="Settings" icon="menusettings" href="/member/edit-profile" active={activeMenu === "settings"} />
          <MenuItem title="Log-Out" icon="menu-log-out" onClick={onLogOut} />
        </div>
        <Footer />
      </div>
    </section>
  );
}
