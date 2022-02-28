import jwtDecode from "jwt-decode";
import ContentOverview from "../../components/organisms/ContentOverview";
import SideBar from "../../components/organisms/Sidebar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";

export default function Member() {
  return (
    <section className="overview overflow-auto">
      <SideBar activeMenu="overview" />
      <ContentOverview />
    </section>
  );
}
interface serverProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export function getServerSideProps({ req }: serverProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const dataUser: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  dataUser.avatar = `${IMG}/${dataUser.avatar}`;

  return {
    props: {
      user: dataUser,
    },
  };
}
