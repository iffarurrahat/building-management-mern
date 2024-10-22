import "./AboutUsPage.css";
import { Helmet } from "react-helmet-async";
import Container from "../../components/ui/Container";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <EmptyStateMain title="About US" pathname="Home" />

      <Container>
        <div className="AboutUsPage flex justify-between gap-6">
          <div className="bg-image h-[500px]">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              architecto! Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Officiis sint corporis ad assumenda, molestiae aut. Ad
              numquam exercitationem est pariatur soluta natus porro fugit
              corporis quae, corrupti officiis facilis at?
            </p>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste totam
            hic itaque eveniet nobis voluptatem laudantium nisi, dolor aut! Modi
            perspiciatis similique a voluptatem alias vel, expedita inventore
            impedit aliquid?
          </p>
        </div>
      </Container>
    </>
  );
};

export default AboutUsPage;
